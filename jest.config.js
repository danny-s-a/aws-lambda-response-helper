module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: false,
    silent: true,
    collectCoverageFrom: [
        'src/*.ts',
        '!src/index.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    }
};
