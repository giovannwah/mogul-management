const guid = process.env.NETLIFY_GOOGLE_ANALYTICS_ID;
const TESTING = true;
// const TEST_EMAIL = 'no-reply@mogulmanagement.net'
const TEST_EMAIL = 'darkyodd@gmail.com';

module.exports = {
  siteMetadata: {
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
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
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
