const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  images: {
    domains: ['cdn.sanity.io'],
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
})