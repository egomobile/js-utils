// This file is part of the @egomobile/js-utils distribution.
// Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
//
// @egomobile/js-utils is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as
// published by the Free Software Foundation, version 3.
//
// @egomobile/js-utils is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

import { toStringSafe } from "./strings";
import type { Nilable } from "./types";

/**
 * A generic, async function.
 *
 * @param {any[]} [args] One or more arguments for the function.
 *
 * @returns {Promise<TResult>} The promise with the result of the function.
 */
export type AsyncFunc<TResult extends any = any> = (...args: any[]) => Promise<TResult>;

/**
 * Custom options for 'toJSONValue()'.
 */
export interface IToJSONValueOptions {
    /**
     * The custom value selector.
     */
    selector?: Nilable<(input: any) => any>;
    /**
     * Execute functions and use their results as the values. Default: (false).
     */
    useFunctionsAsGetters?: boolean;
}

const truelyValues = ["true", "1", "yes", "y"];

/**
 * Keeps sure to returns an async function.
 *
 * @param {Function} func The input value.
 *
 * @example
 * ```
 * const func1 = asAsync((a: number, b: number) => a + b)
 * const func2 = asAsync(async (x: string, y: number) => x + y)
 *
 * const sum1 = await func1(5979, 23979)  // 29958
 * const sum2 = await func2('TM', 5979)  // 'TM5979'
 * ```
 *
 * @returns {AsyncFunc<TResult>} The result with the async function.
 */
export function asAsync<TResult extends any = any>(func: (...args: any[]) => any): AsyncFunc<TResult> {
    if (typeof func !== "function") {
        throw new TypeError("func is no function");
    }

    if (func.constructor.name === "AsyncFunction") {
        return func as AsyncFunc<TResult>;
    }

    // eslint-disable-next-line require-await
    return (async (...args: any[]) => {
        return func(...args);
    }) as AsyncFunc<TResult>;
}

/**
 * Checks if a value is (null) or (null).
 *
 * @param {unknown} val The input value to check.
 *
 * @returns {boolean} (true), if val is (null) or (undefined).
 *
 * @example
 * ```
 * isNil(null)  // (true)
 * isNil(undefined)  // (true)
 *
 * isNil(0)  // (false)
 * isNil('')  // (false)
 * isNil(false)  // (false)
 * ```
 */
export function isNil(val: unknown): val is (null | typeof undefined) {
    return typeof val === "undefined" ||
        val === null;
}

/**
 * Checks if an input value represents a "truely" value.
 *
 * @param {unknown} val The input value to check.
 *
 * @returns {boolean} If (true), input value "truely".
 *
 * @example
 * ```
 * // return (true)
 * isTruely(1)
 * isTruely('1')
 * isTruely(true)
 * isTruely('true')
 * isTruely('y')
 * isTruely('yes')
 * ```
 */
export function isTruely(val: unknown): boolean {
    return truelyValues.includes(
        toStringSafe(val).toLowerCase().trim()
    );
}

/**
 * Converts an input value to a serializable one, if needed.
 *
 * @example
 * ```
 * // no conversion
 * toJSONValue(1)
 * toJSONValue("2")
 * toJSONValue(true)
 * toJSONValue(null)
 * toJSONValue(undefined)
 *
 * // {
 * //   "a": 11,
 * //   "c": "22",
 * //   "e": null,
 * //   "f": false,
 * //   "g": "123",
 * //   "i": "1979-09-05T23:09:00.079Z",
 * //   "j": [111, null, "222", undefined, true]
 * // }
 * toJSONValue({
 *   "a": 11,
 *   "b": Symbol("b"),
 *   "c": "22",
 *   "d": function() { },
 *   "e": null,
 *   "f": false,
 *   "g": BigInt(123),
 *   "h": undefined,
 *   "i": new Date(305420940079),
 *   "j": [111, null, "222", undefined, true]
 * })
 * ```
 *
 * @param {any} value The input value.
 * @param {Nilable<IToJSONValueOptions>} [options] The custom options.
 *
 * @returns {TResult} The output value.
 */
export function toJSONValue<TResult extends any = any>(
    value: any,
    options?: Nilable<IToJSONValueOptions>
): TResult {
    if (!isNil(options?.selector)) {
        if (typeof options!.selector !== "function") {
            throw new TypeError("options.selector must be of type function");
        }
    }

    return toJSONValueInner(0, value, options ?? {});
}

function toJSONValueInner(
    level: number,
    val: any,
    options: IToJSONValueOptions
): any {
    const selector = options.selector ??
        ((input) => {
            return input;
        });
    const shouldUseFunctionsAsGetters = !!options.useFunctionsAsGetters;

    const inputValue = selector(val);

    if (!inputValue) {
        return inputValue;
    }

    const copyOfValue: any = {};

    for (const [prop, objValue] of Object.entries<any>(inputValue)) {
        const propValue = selector(objValue);

        if (propValue instanceof Date) {
            copyOfValue[prop] = (propValue as Date).toISOString();
        }
        else if (Array.isArray(propValue)) {
            copyOfValue[prop] = propValue.map((x) => {
                return toJSONValueInner(level + 1, x, options);
            });
        }
        else if (["object"].includes(typeof propValue)) {
            copyOfValue[prop] = toJSONValueInner(level + 1, propValue, options);
        }
        else if (["bigint"].includes(typeof propValue)) {
            copyOfValue[prop] = toStringSafe(propValue);
        }
        else if (typeof propValue === "function") {
            if (shouldUseFunctionsAsGetters) {
                copyOfValue[prop] = propValue();
            }
        }
        else if (
            !["symbol", "undefined"].includes(typeof propValue)
        ) {
            // only if no symbol or undefined
            copyOfValue[prop] = propValue;
        }
    }

    return copyOfValue;
}

export * from "./geo";
export * from "./http";
export * from "./numbers";
export * from "./strings";
export * from "./types";
