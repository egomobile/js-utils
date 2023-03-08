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

import type { HowToTransformNumber, Nullable } from "./types";

/**
  * Throws an error, if an input value is no valid number.
  *
  * @param {unknown} val The input value.
  * @param {string} [paramName] The custom parameter name for a possible error message.
  *
  * @example
  * ```
  * throwIfNoNumber(0)  // 0
  *
  * // throw errors
  * throwIfNoNumber('0')
  * throwIfNoNumber('foo')
  * throwIfNoNumber('')
  * throwIfNoNumber(true)
  * throwIfNoNumber(null)
  * throwIfNoNumber(undefined)
  * throwIfNoNumber(true)
  * throwIfNoNumber({})
  * throwIfNoNumber([])
  * throwIfNoNumber(Symbol('BAR'))
  * ```
  *
  * @returns {number} The valid number.
  *
  * @throws {TypeError} val is invalid
  */
export function throwIfNoNumber(val: unknown, paramName = "val"): number {
    if (typeof val !== "number" || isNaN(val)) {
        throw new TypeError(`${paramName} is no valid number`);
    }

    return val;
}

/**
  * Transforms a number.
  *
  * @param {number} num The input value.
  * @param {Nullable<HowToTransformNumber>} howToTransform The way, how to transform the input value.
  *
  * @returns {number} The valid number.
  *
  * @throws {TypeError} num is invalid
  *
  * @example
  * ```
  * transformNumber(1)  // 1
  * transformNumber(1.4)  // 1.4
  * transformNumber(1.5)  // 1.5
  * transformNumber(1.6)  // 1.6
  *
  * transformNumber(2, 'ceil')  // 2
  * transformNumber(2.4, 'ceil')  // 3
  * transformNumber(2.5, 'ceil')  // 3
  * transformNumber(2.6, 'ceil')  // 3
  *
  * transformNumber(3, 'floor')  // 3
  * transformNumber(3.4, 'floor')  // 3
  * transformNumber(3.5, 'floor')  // 3
  * transformNumber(3.6, 'floor')  // 3
  *
  * transformNumber(4, 'round')  // 4
  * transformNumber(4.4, 'round')  // 4
  * transformNumber(4.5, 'round')  // 5
  * transformNumber(4.6, 'round')  // 5
  * ```
  */
export function transformNumber(num: number, howToTransform: Nullable<HowToTransformNumber>): number {
    const result = throwIfNoNumber(num, "num");

    let transformer = (n: number) => {
        return n;
    };

    if (howToTransform === "ceil") {
        transformer = Math.ceil;
    }
    else if (howToTransform === "floor") {
        transformer = Math.floor;
    }
    else if (howToTransform === "round") {
        transformer = Math.round;
    }

    return transformer(result);
}
