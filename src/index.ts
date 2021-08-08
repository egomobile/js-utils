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

/**
 * Checks if a value is (null) or (null).
 *
 * @param {unknown} val The input value to check.
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
 *
 * @returns {boolean} (true), if val is (null) or (undefined).
 */
export function isNil(val: unknown): val is (null | undefined) {
    return val === null ||
        typeof val === 'undefined';
}
