module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'tradeinformer.com'
        },
        {
          protocol: 'https',
          hostname: 'slothadmin.tradeinformer.com'
        },
      ],
    },
    trailingSlash: true,
    async redirects() {
        return [
          {
            source: '/home',
            destination: '/',
            permanent: true,
          },
        ]
      },
  }