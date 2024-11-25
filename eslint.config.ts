import { readFile } from 'node:fs/promises'

import lincy from '@lincy/eslint-config'

const autoImport = JSON.parse(
    (await readFile(new URL('./.eslintrc-auto-import.json', import.meta.url))).toString(),
)

const config = await lincy(
    {
        unocss: true,
        formatters: {
            css: false,
            graphql: true,
            html: true,
            markdown: true,
        },
        toml: false,
        overrides: {
            perfectionist: {

            },
        },
    },
    {
        languageOptions: {
            globals: {
                ...autoImport.globals,
            },
        },
    },
    {
        ignores: [
            '**/assets',
            '**/static',
            '**/public',
            '**/polyfill',
        ],
    },
)

export default config
