import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../layouts/index';
import MogulManagementNavigator from '../components/MogulManagementNavigator';
import { TESTING } from '../utils/constants';

const Home = (props) => {
  return (
    <Layout bodyClass="page-home">
      <SEO title="Home" />
      <Helmet>
        <meta
          name="Mogul Management"
          content="Mogul Management"
        />
      </Helmet>
      {
        TESTING &&
        <h6 style={{height: '30px', color: 'white', backgroundColor: 'red', paddingLeft: '30px'}}>TESTING MODE</h6>
      }
      <div className="mogul-container">
        <MogulManagementNavigator />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
