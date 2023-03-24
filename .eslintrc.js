module.exports = {
    env: {
        browser: true,
        es2021: true,
        'vue/setup-compiler-macros': true,
    },
    extends: [
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['vue'],
    rules: {
        'vue/require-prop-types': 0,
        'vue/multi-word-component-names': 'off',
    },
}
