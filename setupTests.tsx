import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'

// From: https://github.com/backstage/backstage/blob/099c6d7b44a87b226f34454c7b725c79d4f0069c/plugins/kubernetes/src/setupTests.ts#L18
// These are missing from jest-node, so not available on global.
Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
})

Object.defineProperty(global, 'TextDecoder', {
  value: TextDecoder,
})

//
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Load the Next package to make sure any needed polyfills are available in the JSDOM environment
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('next')
