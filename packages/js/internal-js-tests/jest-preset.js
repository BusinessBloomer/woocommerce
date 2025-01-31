/**
 * External packages
 */
const path = require( 'path' );

// These modules need to be transformed because they are not transpiled to CommonJS.
const transformModules = [ 'is-plain-obj', 'memize' ];
// Ignore all node_modules except for the ones we need to transform.
const transformIgnorePatterns = [
	`node_modules/(?!.pnpm/${ transformModules.join(
		'|.pnpm/'
	) }|${ transformModules.join( '|' ) })`,
	'/build/',
];

module.exports = {
	moduleNameMapper: {
		tinymce: path.resolve( __dirname, 'build/mocks/tinymce' ),
		'@woocommerce/settings': path.resolve(
			__dirname,
			'build/mocks/woocommerce-settings'
		),
		'@woocommerce/tracks': path.resolve(
			__dirname,
			'build/mocks/woocommerce-tracks'
		),
		'~/(.*)': path.resolve(
			__dirname,
			'../../../plugins/woocommerce-admin/client/$1'
		),
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			path.resolve( __dirname, 'build/mocks/static' ),
		'\\.(scss|css)$': path.resolve(
			__dirname,
			'build/mocks/style-mock.js'
		),
		// Force module uuid to resolve with the CJS entry point, because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
		"uuid": require.resolve('uuid'),
	},
	restoreMocks: true,
	setupFiles: [
		path.resolve( __dirname, 'build/setup-window-globals.js' ),
		path.resolve( __dirname, 'build/setup-globals.js' ),
	],
	setupFilesAfterEnv: [
		path.resolve( __dirname, 'build/setup-react-testing-library.js' ),
	],
	testMatch: [
		'**/__tests__/**/*.[jt]s?(x)',
		'**/test/*.[jt]s?(x)',
		'**/?(*.)test.[jt]s?(x)',
	],
	testPathIgnorePatterns: [
		'/node_modules/',
		'<rootDir>/.*/build/',
		'<rootDir>/.*/build-module/',
		'<rootDir>/tests/e2e/',
	],
	transformIgnorePatterns,
	transform: {
		'^.+\\is-plain-obj/index\\.js$': 'babel-jest',
		'^.+\\memize/dist/index\\.js$': 'babel-jest',
		'^.+\\.[jt]sx?$': 'ts-jest',
	},
	testEnvironment: 'jest-environment-jsdom',
	timers: 'modern',
	verbose: true,
};
