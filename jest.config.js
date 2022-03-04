/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  moduleNameMapper: {
    '@auth/(.*)': '<rootDir>/src/auth/$1',
    '@global/(.*)': '<rootDir>/src/global/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@database/(.*)': '<rootDir>/src/database/$1',
    '@user/(.*)': '<rootDir>/src/user/$1',
    '@role/(.*)': '<rootDir>/src/role/$1',
  },
  // automock: true,
};
