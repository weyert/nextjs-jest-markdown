const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

const customJestConfig = {
  //
  setupFilesAfterEnv: ['<rootDir>/setupTests.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'].filter(Boolean),
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: 'jest tests',
        outputDirectory: 'coverage',
      },
    ],
  ],
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
    [
      'lcov',
      {
        file: 'lcov',
      },
    ],
    [
      'cobertura',
      {
        file: 'test-cobertura-coverage.xml',
      },
    ],
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
  },
}

// 'react-markdown' is an ESM-only package and there is
// no love between Jest and ESM - only packages
//
// This change ensures all the dependencies of this package will get transpiled
// to comonjs in the node_modules package
//
const esModules = [
  'react-markdown',
  'vfile.*',
  'unist-.+',
  'rehype.*',
  'unified',
  'bail',
  'is-.+',
  'trough',
  'remark-.+',
  'mdast-util-.+',
  'micromark.*',
  'parse-entities',
  'character-entities',
  'property-information',
  'comma-separated-tokens',
  'hast-.+',
  'hastscript',
  'space-separated-tokens',
  'decode-named-character-reference',
  'ccount',
  'escape-string-regexp',
  'markdown-table',
  'trim-lines',
  'web-namespaces',
  'zwitch',
  'html-void-elements',
  'github-slugger',
  'refractor',
  'character-.+',
  'direction',
  'bcp-47-match',
  'stringify-entities',
].join('|')


async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  nextJestConfig.transformIgnorePatterns.push(`/node_modules/(?!.pnpm)(?!(${esModules})/)`)
  nextJestConfig.transformIgnorePatterns.push(`/node_modules/.pnpm/(?!(${esModules})@)'`)
  return nextJestConfig
}

module.exports = jestConfig
