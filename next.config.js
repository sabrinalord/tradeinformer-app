module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.tradeinformer.com',
          port: '',
          search: '',
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