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

import type { Nilable } from "./types";

/**
 * Custom options for 'cleanupHTTPHeaders()' function.
 */
export interface ICleanupHTTPHeadersOptions {
    /**
     * Do not clone input object.
     */
    noClone?: Nilable<boolean>;
}

type CleanedUpHttpHeaders1<T> = Omit<T, "authorization">;
type CleanedUpHttpHeaders2<T> = Omit<CleanedUpHttpHeaders1<T>, "cookie">;
type CleanedUpHttpHeaders3<T> = Omit<CleanedUpHttpHeaders2<T>, "set-cookie">;
/**
 * A type without the props, removed by 'cleanupHTTPHeaders()'.
 */
export type CleanedUpHttpHeaders<T extends any = any> = CleanedUpHttpHeaders3<T>;

/**
 * Cleanups object with HTTP headers from sensitive data.
 *
 * @example
 * ```
 * // {
 * //   "test3": () => { },
 * //   "test": 666,
 * //   "test2": new Date(),
 * // }
 * cleanupHTTPHeaders({
 *   "test3": () => { },
 *   "authorization": "foo",
 *   "test": 666,
 *   "cookie": "bar",
 *   "set-cookie": "buzz",
 *   "test2": new Date(),
 * })
 * ```
 *
 * @param {any} headers The input data.
 * @param {Nilable<ICleanupHTTPHeadersOptions>} [options] Custom options.
 *
 * @returns {any} The cleaned up data.
 */
export function cleanupHTTPHeaders<T extends any = any>(
    headers: T,
    options?: Nilable<ICleanupHTTPHeadersOptions>
): CleanedUpHttpHeaders<T> {
    let headersToReturn: any = headers;

    if (headersToReturn) {
        if (!options?.noClone) {
            headersToReturn = JSON.parse(
                JSON.stringify(headersToReturn)
            );
        }

        delete headersToReturn["authorization"];
        delete headersToReturn["cookie"];
        delete headersToReturn["set-cookie"];
    }

    return headersToReturn;
}
