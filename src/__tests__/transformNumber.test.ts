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

import { transformNumber } from "../numbers";

describe("toStringSafe() function", () => {
    it.each([0, 0.1, 0.4, 0.5, 0.6, 0.9, 1.0])("should ceil the result value and throw no error, if input is valid", (num) => {
        const expectedValue = Math.ceil(num);

        let result!: number;
        expect(() => {
            result = transformNumber(num, "ceil");
        }).not.toThrowError(TypeError);

        expect(typeof result).toBe("number");
        expect(isNaN(result)).toBe(false);
        expect(result).toBe(expectedValue);
    });

    it.each([0, 0.1, 0.4, 0.5, 0.6, 0.9, 1.0])("should floor the result value and throw no error, if input is valid", (num) => {
        const expectedValue = Math.floor(num);

        let result!: number;
        expect(() => {
            result = transformNumber(num, "floor");
        }).not.toThrowError(TypeError);

        expect(typeof result).toBe("number");
        expect(isNaN(result)).toBe(false);
        expect(result).toBe(expectedValue);
    });

    it.each([0, 0.1, 0.4, 0.5, 0.6, 0.9, 1.0])("should round the result value and throw no error, if input is valid", (num) => {
        const expectedValue = Math.round(num);

        let result!: number;
        expect(() => {
            result = transformNumber(num, "round");
        }).not.toThrowError(TypeError);

        expect(typeof result).toBe("number");
        expect(isNaN(result)).toBe(false);
        expect(result).toBe(expectedValue);
    });

    it.each(
        [0, 0.1, 0.4, 0.5, 0.6, 0.9, 1.0].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (str: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = transformNumber(str, "ceil");
            result2 = transformNumber(str, "floor");
            result3 = transformNumber(str, "round");
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe("number");
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe("number");
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [true, false].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (bool: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = transformNumber(bool, "ceil");
            result2 = transformNumber(bool, "floor");
            result3 = transformNumber(bool, "round");
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe("number");
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe("number");
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [null, undefined, ""].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (emptyValue: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = transformNumber(emptyValue, "ceil");
            result2 = transformNumber(emptyValue, "floor");
            result3 = transformNumber(emptyValue, "round");
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe("number");
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe("number");
        expect(isNaN(result3)).toBe(true);
    });

    it.each(
        [{}, [], ""].map(x => {
            return String(x);
        })
    )("should throw an error, if input is invalid", (obj: any) => {
        let result1!: number;
        let result2!: number;
        let result3!: number;
        expect(() => {
            result1 = transformNumber(obj, "ceil");
            result2 = transformNumber(obj, "floor");
            result3 = transformNumber(obj, "round");
        }).toThrowError(TypeError);

        expect(typeof result1).not.toBe("number");
        expect(isNaN(result1)).toBe(true);

        expect(typeof result2).not.toBe("number");
        expect(isNaN(result2)).toBe(true);

        expect(typeof result3).not.toBe("number");
        expect(isNaN(result3)).toBe(true);
    });
});
