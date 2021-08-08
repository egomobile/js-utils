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

import { calcDistance } from '../geo';

const egoCampus = { latitude: 50.78209010114186, longitude: 6.047160498172991 };
const egoFactory = { latitude: 50.7757012931635, longitude: 6.1317278116668605 };
const egoDistance = 5.988231289819725;

describe('calcDistance.test() function', () => {
    it.each([{
        loc1: egoCampus,
        loc2: egoFactory
    }, {
        loc1: egoFactory,
        loc2: egoCampus
    }])('should not thrown an TypeError, if input value is valid', ({ loc1, loc2 }) => {
        const expectedValue1 = Math.ceil(egoDistance);
        const expectedValue2 = Math.floor(egoDistance);

        let distanceCeil!: number;
        let distanceFloor!: number;
        expect(() => {
            distanceCeil = Math.ceil(
                calcDistance(loc1, loc2)
            );

            distanceFloor = Math.floor(
                calcDistance(loc1, loc2)
            );
        }).not.toThrowError(TypeError);

        expect(typeof distanceCeil).toBe('number');
        expect(isNaN(distanceCeil)).toBe(false);
        expect(distanceCeil).toBe(expectedValue1);

        expect(typeof distanceFloor).toBe('number');
        expect(isNaN(distanceFloor)).toBe(false);
        expect(distanceFloor).toBe(expectedValue2);
    });

    it.each([{
        loc1: egoCampus,
        loc2: egoFactory
    }, {
        loc1: egoFactory,
        loc2: egoCampus
    }])('should ceil the result value and not throw an TypeError, if input value is valid', ({ loc1, loc2 }) => {
        const expectedValue = Math.ceil(egoDistance);

        let distance!: number;
        expect(() => {
            distance = calcDistance(loc1, loc2, 'ceil');
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe('number');
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each([{
        loc1: egoCampus,
        loc2: egoFactory
    }, {
        loc1: egoFactory,
        loc2: egoCampus
    }])('should floor the result value and not throw an TypeError, if input value is valid', ({ loc1, loc2 }) => {
        const expectedValue = Math.floor(egoDistance);

        let distance!: number;
        expect(() => {
            distance = calcDistance(loc1, loc2, 'floor');
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe('number');
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each([{
        loc1: egoCampus,
        loc2: egoFactory
    }, {
        loc1: egoFactory,
        loc2: egoCampus
    }])('should round the result value and not throw an TypeError, if input value is valid', ({ loc1, loc2 }) => {
        const expectedValue = Math.round(egoDistance);

        let distance!: number;
        expect(() => {
            distance = calcDistance(loc1, loc2, 'round');
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe('number');
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each(
        [0, 0.1, 0.4, 0.5, 0.6, 0.9, 1.0].map(x => String(x))
    )('should throw an error, if input is invalid', (str: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = calcDistance(str, str, 'ceil');
            result2 = calcDistance(str, str, 'floor');
            result3 = calcDistance(str, str, 'round');
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe('number');
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe('number');
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe('number');
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [true, false].map(x => String(x))
    )('should throw an error, if input is invalid', (bool: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = calcDistance(bool, bool, 'ceil');
            result2 = calcDistance(bool, bool, 'floor');
            result3 = calcDistance(bool, bool, 'round');
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe('number');
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe('number');
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe('number');
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [null, undefined, ''].map(x => String(x))
    )('should throw an error, if input is invalid', (emptyValue: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = calcDistance(emptyValue, emptyValue, 'ceil');
            result2 = calcDistance(emptyValue, emptyValue, 'floor');
            result3 = calcDistance(emptyValue, emptyValue, 'round');
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe('number');
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe('number');
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe('number');
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [{}, [], ''].map(x => String(x))
    )('should throw an error, if input is invalid', (obj: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = calcDistance(obj, obj, 'ceil');
            result2 = calcDistance(obj, obj, 'floor');
            result3 = calcDistance(obj, obj, 'round');
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe('number');
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe('number');
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe('number');
        expect(isNaN(result3)).toBe(true);
    });
});
