module.exports = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false }

    return config
  },
}
