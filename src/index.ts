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

export * from './geo';
export * from './numbers';
export * from './strings';
export * from './types';

import { toStringSafe } from './strings';

const truelyValues = ['true', '1', 'yes', 'y'];

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
