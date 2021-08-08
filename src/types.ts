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
 * A geo location.
 */
export interface IGeoLocation {
    /**
     * The latitude.
     */
    latitude: number;
    /**
     * The longitude.
     */
    longitude: number;
}

/**
 * How to transform a number.
 */
export type HowToTransformNumber = 'ceil' | 'floor' | 'round';

/**
 * A value, that can also be (undefined).
 */
export type Optional<T> = T | undefined;

/**
 * A value, that can also be (undefined) or (null).
 */
export type Nilable<T> = Optional<T> | Nullable<T>;

/**
 * A value, that can also be (null).
 */
export type Nullable<T> = T | null;

/**
 * A type with empty properties and values (null / undefined, e.g.).
 */
export type WithEmptyPropsAndValues<T> = Nilable<WillNullableProps<Partial<T>>>;

/**
 * An object with properties, which can also be (null),
 */
export type WillNullableProps<T> = {
    [P in keyof T]: Nullable<T[P]>;
};
