import type {Config} from '@jest/types';
const config : Config.InitialOptions= {
  preset: 'ts-preset',
  testEnvironment:'node',
  verbose:true,
  coverageDirectory:'coverage',
  collectCoverage:true,
  testPathIgnorePatterns:['/node_modules/','/dist/'],
  transform:{
    '^.+\\.ts?$':'ts-jest'
  },
  testMatch:['<rootDir>/src/**/*.test.ts'],
  coverageThreshold:{
    global:{
      branches:1,
      functions:1,
      lines:1,
      statements:1
    }
  },
  coverageReporters:['text-summary','lcov'],
  moduleNameMapper:{
    '@authservices/(.*)':'<rootDir>/src/$1'
  }
}

export default config;
