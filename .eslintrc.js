module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jsx-a11y"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "react/jsx-uses-react": 1,
        "react/jsx-uses-vars": 1,
        "no-var": 2
    }
}