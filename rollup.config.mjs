/* eslint-disable @typescript-eslint/naming-convention */

import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    "input": "src/index.ts",
    "output": [
        {
            "file": "lib/index.esm.js",
            "format": "esm",
            "sourcemap": false,
            "exports": "named"
        },
        {
            "file": "lib/index.cjs.js",
            "format": "cjs",
            "sourcemap": false,
            "exports": "named"
        },
        {
            "name": "EgoUtils",
            "file": "lib/index.umd.js",
            "format": "umd",
            "sourcemap": false,
            "exports": "named"
        }
    ],
    "plugins": [
        typescript({
            "exclude": ["**/__tests__", "**/*.test.ts", "node_modules"]
        }),
        nodeResolve(),
        commonjs()
    ]
};