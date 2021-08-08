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

import { deg2rad } from '../geo';

describe('deg2rad() function', () => {
    it.each([0, 10, 180, 270, 360])('should not thrown an TypeError, if input value is valid', (deg) => {
        const expectedValue = deg * (Math.PI / 180);

        let value!: number;
        expect(() => {
            value = deg2rad(deg);
        }).not.toThrowError(TypeError);

        expect(typeof value).toBe('number');
        expect(isNaN(value)).toBe(false);
        expect(value).toBe(expectedValue);
    });

    it.each([0, 10, 180, 270, 360, 'MK+TM'].map(x => String(x)))('should thrown an TypeError, if input value is string', (str: any) => {
        let value!: number;
        expect(() => {
            value = deg2rad(str);
        }).toThrowError(TypeError);

        expect(typeof value).not.toBe('number');
        expect(isNaN(value)).toBe(true);
    });

    it.each([null, undefined, ''].map(x => String(x)))('should thrown an TypeError, if input value is empty value', (val: any) => {
        let value!: number;
        expect(() => {
            value = deg2rad(val);
        }).toThrowError(TypeError);

        expect(typeof value).not.toBe('number');
        expect(isNaN(value)).toBe(true);
    });

    it.each([true, false].map(x => String(x)))('should thrown an TypeError, if input value is (null) or (undefined)', (val: any) => {
        let value!: number;
        expect(() => {
            value = deg2rad(val);
        }).toThrowError(TypeError);

        expect(typeof value).not.toBe('number');
        expect(isNaN(value)).toBe(true);
    });

    it.each([{}, []].map(x => String(x)))('should thrown an TypeError, if input value is object', (val: any) => {
        let value!: number;
        expect(() => {
            value = deg2rad(val);
        }).toThrowError(TypeError);

        expect(typeof value).not.toBe('number');
        expect(isNaN(value)).toBe(true);
    });

    it.each([Symbol(), Symbol('TEST')].map(x => String(x)))('should thrown an TypeError, if input value is object', (val: any) => {
        let value!: number;
        expect(() => {
            value = deg2rad(val);
        }).toThrowError(TypeError);

        expect(typeof value).not.toBe('number');
        expect(isNaN(value)).toBe(true);
    });
});
