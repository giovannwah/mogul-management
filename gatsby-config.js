const guid = process.env.NETLIFY_GOOGLE_ANALYTICS_ID;
const testing = false;
const test_email = 'no-reply@mogulmanagement.net'

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
      {
        name: 'Join',
        link: '/join',
      },
    ],
    businessEmail: testing ? test_email : 'mogulmanagementus@gmail.com',
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
