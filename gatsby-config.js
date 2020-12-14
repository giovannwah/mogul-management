const guid = process.env.NETLIFY_GOOGLE_ANALYTICS_ID;
const TEST_EMAIL = 'darkyodd@gmail.com';
const TESTING = true;
// export const TEST_EMAIL = 'no-reply@mogulmanagement.net'
module.exports = {
  siteMetadata: {
    testing: TESTING,
    title: 'KMM Enterprise, LLC',
    description: 'KMM Enterprise Website',
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
    altMenuLinks: [
      {
        name: 'Credit Repair',
        link: '/consultations/credit-consulting',
      },
      {
        name: 'Motivated Seller',
        link: '/consultations/motivated-seller',
      },
      {
        name: 'Investor Criteria',
        link: '/consultations/investor-consulting',
      },
      {
        name: 'Contact',
        link: '/contact',
      },
      {
        name: 'About',
        link: '/about',
      }
    ],
    businessEmail: TESTING ? TEST_EMAIL : 'info@kmmenterprise.net',
    // businessEmail:
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    // {
    //   resolve: 'gatsby-source-stripe',
    //   options: {
    //     objects: ["Price"],
    //     secretKey: process.env.STRIPE_SECRET_KEY,
    //     downloadFiles: false,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        whitelist: ['PAYPAL_SANDBOX_CLIENT_ID',
          'PAYPAL_SANDBOX_CLIENT_SECRET',
          'PAYPAL_LIVE_CLIENT_ID',
          'PAYPAL_LIVE_CLIENT_SECRET',
          'RECAPTCHA_SITE_KEY',
          'RECAPTCHA_SITE_SECRET',
          'EMAIL_API_KEY',
          'STRIPE_LIVE_PUBLIC_KEY',
          'STRIPE_TEST_PUBLIC_KEY',
          'STRIPE_LIVE_SECRET_KEY',
          'STRIPE_TEST_SECRET_KEY'],
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
