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