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

import { toStringSafe } from './strings';

/**
 * A generic, async function.
 *
 * @param {any[]} [args] One or more arguments for the function.
 *
 * @returns {Promise<TResult>} The promise with the result of the function.
 */
export type AsyncFunc<TResult extends any = any> = (...args: any[]) => Promise<TResult>;

const truelyValues = ['true', '1', 'yes', 'y'];

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
export function asAsync<TResult extends any = any>(func: () => TResult): AsyncFunc<TResult>;
export function asAsync<TResult extends any = any>(func: () => PromiseLike<TResult>): AsyncFunc<TResult>;
export function asAsync<TResult extends any = any>(
    func: Function
): AsyncFunc<TResult> {
    if (typeof func !== 'function') {
        throw new TypeError('func is no function');
    }

    if (func.constructor.name === 'AsyncFunction') {
        return func as AsyncFunc<TResult>;
    }

    // eslint-disable-next-line require-await
    return (async function (...args: any[]) {
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
export function isNil(val: unknown): val is (null | undefined) {
    return val === null ||
        typeof val === 'undefined';
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

export * from './geo';
export * from './numbers';
export * from './strings';
export * from './types';
