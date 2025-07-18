export default {
    extends: ['@lincy/stylelint-config'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'use',
                ],
            },
        ],
    },
}
