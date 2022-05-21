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

import type { HowToTransformNumber, IGeoLocation, Nilable, Nullable, WithEmptyPropsAndValues } from "./types";

const throwIfNoNumber = (n: number, pn: string) => {
    return require("./numbers").throwIfNoNumber(n, pn);
};
const transformNumber = (n: number, htt: Nilable<HowToTransformNumber>) => {
    return require("./numbers").transformNumber(n, htt);
};

// the Earth radius in km
export const earthRadius = 6371;

/**
 * Calculates the distance between two geo coordinates in kilometers.
 *
 * @param {IGeoLocation} loc1 The start location.
 * @param {IGeoLocation} loc2 The end location.
 * @param {Nilable<HowToTransformNumber>} [howToTransform] The way how to transform the result.
 *
 * @returns {number} The distance in km.
 *
 * @example
 * ```
 * const egoCampus = { latitude: 50.78209010114186, longitude: 6.047160498172991 };
 * const egoFactory = { latitude: 50.7757012931635, longitude: 6.1317278116668605 };
 *
 * calcDistance(egoCampus, egoFactory)  // 5.988231289819725
 * calcDistance(egoFactory, egoCampus)  // 5.988231289819725
 *
 * calcDistance(egoCampus, egoFactory, 'ceil')  // 6
 * calcDistance(egoCampus, egoFactory, 'floor')  // 5
 * calcDistance(egoCampus, egoFactory, 'round')  // 6
 * ```
 */
export function calcDistance(
    loc1: IGeoLocation, loc2: IGeoLocation,
    howToTransform?: Nilable<HowToTransformNumber>
): number {
    const lat1 = throwIfNoNumber(loc1?.latitude, "loc1.latitude");
    const lng1 = throwIfNoNumber(loc1?.longitude, "loc1.longitude");
    const lat2 = throwIfNoNumber(loc2?.latitude, "loc2.latitude");
    const lng2 = throwIfNoNumber(loc2?.longitude, "loc2.longitude");

    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lng2 - lng1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 2;

    return transformNumber(
        earthRadius * c,  // distance in km
        howToTransform
    );
}

/**
 * Helper function converting degrees to radian.
 *
 * @param {number} deg The input value in degrees.
 *
 * @returns {number} The output value in radian.
 *
 * @example
 * ```
 * deg2rad(0)  // 0
 * deg2rad(10)  // 0.17453292519943295
 * deg2rad(180)  // 3.141592653589793
 * deg2rad(270)  // 4.71238898038469
 * deg2rad(360)  // 6.283185307179586
 * ```
 */
export function deg2rad(deg: number): number {
    throwIfNoNumber(deg, "deg");

    return deg * (Math.PI / 180);
}

/**
 * Helper function converting radian to degrees.
 *
 * @param {number} rad The input value in radian.
 *
 * @returns {number} The output value in degrees.
 *
 * @example
 * ```
 * rad2deg(0)  // 0
 * rad2deg(1)  // 57.29577951308232
 * rad2deg(2)  // 114.59155902616465
 * rad2deg(3)  // 171.88733853924697
 * rad2deg(4)  // 229.1831180523293
 * ```
 */
export function rad2deg(rad: number): number {
    throwIfNoNumber(rad, "rad");

    return (rad * 180) / Math.PI;
}

/**
 * Tries to calculates the distance between two geo coordinates in kilometers.
 * If not enough valid data is submitted, (null) is returned.
 *
 * @param {WithEmptyPropsAndValues<IGeoLocation>} loc1 The start location.
 * @param {WithEmptyPropsAndValues<IGeoLocation>} loc2 The end location.
 * @param {HowToTransformNumber} [howToTransform] The way how to transform the result.
 *
 * @returns {Nullable<number>} The distance in km or (null) if not enough, valid input data.
 *
 * @example
 * ```
 * const egoCampus = { latitude: 50.78209010114186, longitude: 6.047160498172991 };
 * const egoFactory = { latitude: 50.7757012931635, longitude: 6.1317278116668605 };
 *
 * tryCalcDistance(egoCampus, egoFactory)  // 5.988231289819725
 * tryCalcDistance(egoFactory, egoCampus)  // 5.988231289819725
 *
 * tryCalcDistance(egoCampus, egoFactory, 'ceil')  // 6
 * tryCalcDistance(egoCampus, egoFactory, 'floor')  // 5
 * tryCalcDistance(egoCampus, egoFactory, 'round')  // 6
 *
 * tryCalcDistance(null, null)  // (null)
 * tryCalcDistance(undefined, undefined)  // (null)
 * tryCalcDistance(egoCampus, null)  // (null)
 * tryCalcDistance(null, egoCampus)  // (null)
 * tryCalcDistance(egoCampus, undefined)  // (null)
 * tryCalcDistance(undefined, egoCampus)  // (null)
 * ```
 */
export function tryCalcDistance(
    loc1: WithEmptyPropsAndValues<IGeoLocation>, loc2: WithEmptyPropsAndValues<IGeoLocation>,
    howToTransform?: Nilable<HowToTransformNumber>
): Nullable<number> {
    const valuesToCheck = [
        loc1?.latitude, loc1?.longitude,
        loc2?.latitude, loc2?.longitude
    ];

    if (valuesToCheck.every(
        num => {
            return typeof num === "number" && !isNaN(num);
        })
    ) {
        // every value must be a valid number
        return calcDistance(loc1 as IGeoLocation, loc2 as IGeoLocation, howToTransform);
    }

    return null;
}
