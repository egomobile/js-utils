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

import { throwIfNoNumber } from '../numbers';

describe('throwIfNoNumber.test() function', () => {
    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])('should return valid number, if input is number', (num) => {
        let validNumber!: number;
        expect(() => {
            validNumber = throwIfNoNumber(num);
        }).not.toThrowError();

        expect(typeof validNumber).toBe('number');
        expect(validNumber).toBe(num);
        expect(isNaN(validNumber)).toBe(false);
    });

    it.each([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => String(x)))('should throw a TypeError, if input is not a number', (str) => {
        let num!: number;
        expect(() => {
            num = throwIfNoNumber(str);
        }).toThrowError(TypeError);

        expect(typeof num).not.toBe('number');
        expect(isNaN(num)).toBe(true);
    });

    it.each([null, undefined, ''].map(x => String(x)))('should throw a TypeError, if input is an empty value', (val) => {
        let num!: number;
        expect(() => {
            num = throwIfNoNumber(val);
        }).toThrowError(TypeError);

        expect(typeof num).not.toBe('number');
        expect(isNaN(num)).toBe(true);
    });

    it.each([true, false].map(x => String(x)))('should throw a TypeError, if input is a boolean', (val) => {
        let num!: number;
        expect(() => {
            num = throwIfNoNumber(val);
        }).toThrowError(TypeError);

        expect(typeof num).not.toBe('number');
        expect(isNaN(num)).toBe(true);
    });

    it.each([{}, []].map(x => String(x)))('should throw a TypeError, if input is an object', (val) => {
        let num!: number;
        expect(() => {
            num = throwIfNoNumber(val);
        }).toThrowError(TypeError);

        expect(typeof num).not.toBe('number');
        expect(isNaN(num)).toBe(true);
    });

    it.each([Symbol(), Symbol('TEST')].map(x => String(x)))('should throw a TypeError, if input is a symbol', (val) => {
        let num!: number;
        expect(() => {
            num = throwIfNoNumber(val);
        }).toThrowError(TypeError);

        expect(typeof num).not.toBe('number');
        expect(isNaN(num)).toBe(true);
    });
});
