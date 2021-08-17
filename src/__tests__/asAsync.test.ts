/* eslint-disable require-await */

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

import { asAsync, AsyncFunc } from '..';

function func1(a: number, b: number) {
    return a + b;
}

async function func2(a: number, b: number) {
    return a + b;
}

const func3 = (a: number, b: number) => a + b;

const func4 = async (a: number, b: number) => a + b;

describe('asAsync() function', () => {
    it.each([func1, func2, func3, func4])('should return async function, if input is a function', async (f) => {
        let asyncFunc!: AsyncFunc;
        expect(() => {
            asyncFunc = asAsync(f);
        }).not.toThrow(TypeError);

        expect(typeof asyncFunc).toBe('function');
        expect(asyncFunc.constructor.name).toBe('AsyncFunction');

        const sum = await asyncFunc(1, 2);

        expect(typeof sum).toBe('number');
        expect(sum).toBe(3);
    });

    it.each([
        'TM+MK',
        {},
        [],
        5979,
        new Date(1979, 9, 5),
        false,
        null,
        undefined
    ])('should throw a TypeError, if input is not a function', async (val) => {
        let noAsyncFunc!: any;
        expect(() => {
            noAsyncFunc = asAsync(val as any);
        }).toThrow(TypeError);

        expect(typeof noAsyncFunc).not.toBe('function');
        expect(noAsyncFunc?.constructor?.name).not.toBe('AsyncFunction');
    });
});
