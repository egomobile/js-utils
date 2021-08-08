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

import { isNil } from '..';

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

describe('isNil() function', () => {
    it.each([null, undefined])('should return (true), if empty value', (emptyValue) => {
        expect(isNil(emptyValue)).toBe(true);
    });

    it.each([String(null), String(undefined)])('should return (false), if non empty value', (nonEmptyValue) => {
        expect(isNil(nonEmptyValue)).toBe(false);
    });

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])('should return (false), if input is number', (num) => {
        expect(isNil(num)).toBe(false);
    });

    it.each([true, false])('should return (false), if input is boolean', (bool) => {
        expect(isNil(bool)).toBe(false);
    });

    it.each([symbolValue])('should return string, if input is symbol', (sym) => {
        expect(isNil(sym)).toBe(false);
    });

    it.each([new TestClass()])('should return string, if input is class object', (obj) => {
        expect(isNil(obj)).toBe(false);
    });

    it.each([plainObj])('should return string, if input is class object', (obj) => {
        expect(isNil(obj)).toBe(false);
    });
});
