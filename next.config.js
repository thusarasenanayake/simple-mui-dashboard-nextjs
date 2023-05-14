module.exports = {
    // webpack: false,
    eslint: {
        dirs: ['pages', 'utils'],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard/mails',
                permanent: true,
            },
        ];
    },
};
