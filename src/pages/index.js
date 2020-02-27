import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../layouts/index';
import MogulManagementNavigator from '../components/MogulManagementNavigator';
import HomeContent from '../../content/pages/home/index';

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
      <div className="mogul-container">
        {/*<div id="quote-container">*/}
        {/*  <div id="quote-secondary-container">*/}
        {/*    <p id="quote-main">"{HomeContent.content.quote}"</p>*/}
        {/*    <b id="quotee">- {HomeContent.content.quote_by}</b>*/}
        {/*  </div>*/}
        {/*</div>*/}
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
