module.exports = {
    title: 'Maybank Assessment',
    description: `maybank-assessment`,
    base: process.env.DEPLOY_ENV === 'gh-pages' ? '/maybank-assessment/' : '/',
    themeConfig: {
        sidebar: [
            ['/', 'Introduction'],
            // '/docs/tech',
            // '/docs/routing',
            // '/docs/state',
            // '/docs/linting',
            // '/docs/editors',
            // '/docs/production',
            // '/docs/troubleshooting',
        ],
    },
};
