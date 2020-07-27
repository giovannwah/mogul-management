const guid = process.env.NETLIFY_GOOGLE_ANALYTICS_ID;
const TESTING = false;
const TEST_EMAIL = 'darkyodd@gmail.com';
// export const TEST_EMAIL = 'no-reply@mogulmanagement.net'
module.exports = {
  siteMetadata: {
    testing: TESTING,
    title: 'Mogul Management, LLC',
    description: 'Mogul Management Website',
    menuLinks: [
      {
        name: 'Consultations',
        link: '/consultations',
      },
      {
        name: 'Contact',
        link: '/contact',
      },
    ],
    businessEmail: TESTING ? TEST_EMAIL : 'mogulmanagementus@gmail.com',
    // businessEmail:
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['PAYPAL_SANDBOX_CLIENT_ID',
          'PAYPAL_SANDBOX_CLIENT_SECRET',
          'PAYPAL_LIVE_CLIENT_ID',
          'PAYPAL_LIVE_CLIENT_SECRET',
          'RECAPTCHA_SITE_KEY',
          'RECAPTCHA_SITE_SECRET',
          'EMAIL_API_KEY'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: guid ? guid : 'UA-XXX-1',
        // Puts tracking script in the head instead of the body
        head: false,
      },
    },
  ],
};
