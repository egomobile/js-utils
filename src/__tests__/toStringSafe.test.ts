/**
 * This file is part of the @egomobile/js-utils distribution.
 * Copyright (c) Next.e.GO Mobile SE, Aachen, Germany (https://e-go-mobile.com/)
 *
 * @egomobile/js-utils is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * @egomobile/js-utils is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import { toStringSafe } from '../strings';

const customDefaultValue = 'TM+MK';
const symbolValue = Symbol('TEST');

class TestClass {
    toString() {
        return 'tm+mk';
    }
}

const plainObj = {
    toString() {
        return 'TM+MK';
    }
};

const array1 = [null, undefined, 1, '2', true, false];

const error = new Error('Hello, Error!');
const typeError = new TypeError('Hello, TypeError!');

describe('toStringSafe() function', () => {
    it.each([null, undefined])('should return default string, if empty value', (emptyValue) => {
        expect(toStringSafe(emptyValue)).toBe('');
        expect(toStringSafe(emptyValue, '')).toBe('');
        expect(toStringSafe(emptyValue, customDefaultValue)).toBe(customDefaultValue);
    });

    it.each([' ', String(null), String(undefined)])('should return non default string, if empty value', (nonEmptyValue) => {
        expect(toStringSafe(nonEmptyValue)).not.toBe('');
        expect(toStringSafe(nonEmptyValue, '')).not.toBe('');
        expect(toStringSafe(nonEmptyValue, customDefaultValue)).not.toBe(customDefaultValue);
    });

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])('should return string, if input is number', (num) => {
        const expectedValue = String(num);
        const str = toStringSafe(num);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each([true, false])('should return string, if input is boolean', (bool) => {
        const expectedValue = String(bool);
        const str = toStringSafe(bool);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each(['', 'MK', 'TM'])('should return string, if input is string', (s) => {
        const expectedValue = String(s);
        const str = toStringSafe(s);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each([symbolValue])('should return string, if input is symbol', (sym) => {
        const expectedValue = String(sym);
        const str = toStringSafe(sym);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each([new TestClass()])('should return string, if input is class object with custom toString() method', (obj) => {
        const expectedValue = obj.toString();
        const str = toStringSafe(obj);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each([plainObj])('should return string, if input is class object with custom toString() method', (obj) => {
        const expectedValue = obj.toString();
        const str = toStringSafe(obj);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it.each([error, typeError])('should return string, if input is error object', (err) => {
        const expectedValue = `ERROR [${err.name}]: ${err.message}

${err.stack || ''}`;
        const str = toStringSafe(err);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });

    it('should return string, if input is a JSON array', () => {
        const expectedValue = JSON.stringify(array1);
        const str = toStringSafe(array1);

        expect(typeof str).toBe('string');
        expect(str).toBe(expectedValue);
    });
});
