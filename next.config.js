/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  sassOptions: {
    prependData: [
      '@import "src/styles/designsystem/mixins";',
      '@import "src/styles/designsystem/config";',
      '@import "src/styles/ui/mixins";',
    ].join("\n"),
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
