module.exports = {
    globals: {
        window: true,
        'ts-jest': {
            tsConfig: __dirname + '/tsconfig.json',
        },
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '/test/.*\\.spec\\.ts$',
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['js', 'ts'],
    transformIgnorePatterns: ['node_modules'],
    reporters: [ 'default' ]
};
