// If you want to use the bundle analyzer just replace transpiler
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { createSecureHeaders } = require('next-secure-headers')

module.exports = withBundleAnalyzer(
  /** @type {import('next').NextConfig} */
  {
    // Set the build destination directory to build
    distDir: 'build',

    // Disable the Powered-By header
    poweredByHeader: false,

    // Transpile the ESM package
    transpilePackages: ['react-markdown'],

    // Disable eslint checking during next build step
    typescript: {
      ignoreBuildErrors: false,
    },
    eslint: {
      ignoreDuringBuilds: false,
    },

    // Enable strict React mode
    reactStrictMode: true,

    experimental: {
      // Allow us to import ts files from outside of baseUrl, e.g. shared folder https://github.com/vercel/next.js/pull/22867
      externalDir: true,
    },

    //
    rewrites: () => ({
      beforeFiles: [
        // Proxy metrics requests to Posthog.
        { source: '/quantify/:p*', destination: 'https://app.posthog.com/:p*' },
      ],
      afterFiles: [],
      fallback: [],
    }),

    // Add security headers to the web-application
    headers() {
      return Promise.resolve([
        {
          source: '/',
          headers: createSecureHeaders({
            // allow embedding the iframe widget
            frameGuard: false,
          }),
        },
        {
          source: '/_next(.*)',
          headers: createSecureHeaders(),
        },
      ])
    },
  },
)
