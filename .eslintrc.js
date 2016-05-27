module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
		"mocha": true
	},
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"globals": {},
	"rules": {
		"indent": 0,
		"no-console": 0,
		"react/prop-types": 2,
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		]
	}
};
