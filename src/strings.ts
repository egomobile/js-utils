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

/**
 * Converts an input value to its string representation,
 * that is not (null) and not (undefined).
 * NOTE: If an exception occurrs, the default value is returned.
 *
 * @param {unknown} val The input value to check.
 * @param {string} [defaultValue] The custom default value.
 *
 * @example
 * ```
 * class TestClass {
 *   toString() { return 'Foo!'; }
 * }
 *
 * class TestClass2 {
 *   toString() { throw new Error('An Error!'); }
 * }
 *
 * const obj = {
 *   toString: () => '!!!BAZZZ!!!'
 * }
 *
 * const obj2 = {
 *   toString() { throw new Error('An Error!'); }
 * }
 *
 * toStringSafe(null)  // ''
 * toStringSafe(null, 'foo')  // 'foo'
 * toStringSafe(undefined)  // ''
 * toStringSafe(undefined, 'bar')  // 'bar'
 * toStringSafe(new TestClass2())  // ''
 * toStringSafe(new TestClass2(), 'cat')  // 'cat'
 * toStringSafe(obj2)  // ''
 * toStringSafe(obj2, 'baz')  // 'baz'
 *
 * toStringSafe(0)  // '0'
 * toStringSafe(0, 'baz')  // '0'
 * toStringSafe(false)  // 'false'
 * toStringSafe(false, 'fooBar')  // 'false'
 * toStringSafe('')  // ''
 * toStringSafe('', 'Barfoo')  // ''
 * toStringSafe(Symbol('TEST'))  // 'Symbol(TEST)'
 * toStringSafe(Symbol('TEST'), 'symbolDefault')  // 'Symbol(TEST)'
 *
 * toStringSafe(new TestClass())  // 'Foo!'
 * toStringSafe(new TestClass(), 'Bar!')  // 'Foo!'
 *
 * toStringSafe(obj)  // '!!!BAZZZ!!!'
 * toStringSafe(obj, 'Barbara!')  // '!!!BAZZZ!!!'
 * ```
 *
 * @returns {string} The input value as string.
 */
export function toStringSafe(val: any, defaultValue: string = ''): string {
    if (typeof val === 'string') {
        return val;
    }

    if (!(val === null || typeof val === 'undefined')) {
        try {
            if (Array.isArray(val)) {
                return JSON.stringify(val);
            }

            if (val instanceof Error) {
                return `ERROR [${val.name}]: ${val.message}

${val.stack || ''}`;
            }

            if (typeof val['toString'] === 'function') {
                return String(val.toString());
            }

            return String(val);
        } catch { }
    }

    return defaultValue;
}
