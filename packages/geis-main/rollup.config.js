import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pkg from './package.json'

const external = Object.keys(pkg.dependencies)
console.log(external)

export default [
    {
        input: 'lib/index.ts',
        output: {
            dir: 'dist',
            format: 'cjs',
            sourcemap: true,
        },
        plugins: [
            typescript(),
            nodeResolve({ preferBuiltins: false }), // or `true`
            commonjs(),
            json(),
        ],
        external,
    },
    {
        input: './dist/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [
            dts({
                respectExternal: true,
            }),
        ],
        external,
    },
]
