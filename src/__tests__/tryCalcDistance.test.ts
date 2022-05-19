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

import { tryCalcDistance } from "../geo";
import { Nullable } from "../types";

const egoCampus = { "latitude": 50.78209010114186, "longitude": 6.047160498172991 };
const egoFactory = { "latitude": 50.7757012931635, "longitude": 6.1317278116668605 };
const egoDistance = 5.988231289819725;

describe("tryCalcDistance.test.test() function", () => {
    it.each([{
        "loc1": egoCampus,
        "loc2": egoFactory
    }, {
        "loc1": egoFactory,
        "loc2": egoCampus
    }])("should not thrown an TypeError, if input value is valid", ({ loc1, loc2 }) => {
        const expectedValue1 = Math.ceil(egoDistance);
        const expectedValue2 = Math.floor(egoDistance);

        let distanceCeil!: number;
        let distanceFloor!: number;
        expect(() => {
            distanceCeil = Math.ceil(
                tryCalcDistance(loc1, loc2)!
            );

            distanceFloor = Math.floor(
                tryCalcDistance(loc1, loc2)!
            );
        }).not.toThrowError(TypeError);

        expect(typeof distanceCeil).toBe("number");
        expect(isNaN(distanceCeil)).toBe(false);
        expect(distanceCeil).toBe(expectedValue1);

        expect(typeof distanceFloor).toBe("number");
        expect(isNaN(distanceFloor)).toBe(false);
        expect(distanceFloor).toBe(expectedValue2);
    });

    it.each([{
        "loc1": egoCampus,
        "loc2": egoFactory
    }, {
        "loc1": egoFactory,
        "loc2": egoCampus
    }])("should ceil the result value and not throw an TypeError, if input value is valid", ({ loc1, loc2 }) => {
        const expectedValue = Math.ceil(egoDistance);

        let distance!: number;
        expect(() => {
            distance = tryCalcDistance(loc1, loc2, "ceil")!;
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe("number");
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each([{
        "loc1": egoCampus,
        "loc2": egoFactory
    }, {
        "loc1": egoFactory,
        "loc2": egoCampus
    }])("should floor the result value and not throw an TypeError, if input value is valid", ({ loc1, loc2 }) => {
        const expectedValue = Math.floor(egoDistance);

        let distance!: number;
        expect(() => {
            distance = tryCalcDistance(loc1, loc2, "floor")!;
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe("number");
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each([{
        "loc1": egoCampus,
        "loc2": egoFactory
    }, {
        "loc1": egoFactory,
        "loc2": egoCampus
    }])("should round the result value and not throw an TypeError, if input value is valid", ({ loc1, loc2 }) => {
        const expectedValue = Math.round(egoDistance);

        let distance!: number;
        expect(() => {
            distance = tryCalcDistance(loc1, loc2, "round")!;
        }).not.toThrowError(TypeError);

        expect(typeof distance).toBe("number");
        expect(isNaN(distance)).toBe(false);
        expect(distance).toBe(expectedValue);
    });

    it.each(
        [true, false].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (bool: any) => {
        let result1!: Nullable<number>;
        let result2!: Nullable<number>;
        let result3!: Nullable<number>;
        expect(() => {
            result1 = tryCalcDistance(bool, bool, "ceil");
            result2 = tryCalcDistance(bool, bool, "floor");
            result3 = tryCalcDistance(bool, bool, "round");
        }).not.toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(result1).toBe(null);
        expect(isNaN(result1!)).toBe(false);

        expect(typeof result2).not.toBe("number");
        expect(result2).toBe(null);
        expect(isNaN(result2!)).toBe(false);

        expect(typeof result3).not.toBe("number");
        expect(result3).toBe(null);
        expect(isNaN(result3!)).toBe(false);
    });

    it.each(
        [null, undefined, ""].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (emptyValue: any) => {
        let result1!: Nullable<number>;
        let result2!: Nullable<number>;
        let result3!: Nullable<number>;
        expect(() => {
            result1 = tryCalcDistance(emptyValue, emptyValue, "ceil");
            result2 = tryCalcDistance(emptyValue, emptyValue, "floor");
            result3 = tryCalcDistance(emptyValue, emptyValue, "round");
        }).not.toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(result1).toBe(null);
        expect(isNaN(result1!)).toBe(false);

        expect(typeof result2).not.toBe("number");
        expect(result2).toBe(null);
        expect(isNaN(result2!)).toBe(false);

        expect(typeof result3).not.toBe("number");
        expect(result3).toBe(null);
        expect(isNaN(result3!)).toBe(false);
    });

    it.each(
        [{}, [], ""].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (obj: any) => {
        let result1!: Nullable<number>;
        let result2!: Nullable<number>;
        let result3!: Nullable<number>;
        expect(() => {
            result1 = tryCalcDistance(obj, obj, "ceil");
            result2 = tryCalcDistance(obj, obj, "floor");
            result3 = tryCalcDistance(obj, obj, "round");
        }).not.toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(result1).toBe(null);
        expect(isNaN(result1!)).toBe(false);

        expect(typeof result2).not.toBe("number");
        expect(result2).toBe(null);
        expect(isNaN(result2!)).toBe(false);

        expect(typeof result3).not.toBe("number");
        expect(result3).toBe(null);
        expect(isNaN(result3!)).toBe(false);
    });
});
