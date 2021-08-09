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

import { isTruely } from '..';

describe('isTruely() function', () => {
    it.each([1, '1', true, 'true', 'y', 'yes'])('should return (true), if truely value', (val) => {
        expect(isTruely(val)).toBe(true);
    });

    it.each([
        0, '0', false, 'false', 'n', 'no', 2, 3, 4, 5, 6, 7, 8, 9, null, undefined, {}, []
    ])('should return (false), if non-truely value', (val) => {
        expect(isTruely(val)).toBe(false);
    });
});
