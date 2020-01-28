import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import SEO from '../components/SEO';
import Layout from '../layouts/index';
import Grid from '@material-ui/core/Grid';
import InvestorContent from '../../content/pages/consultations/investor-consulting';
import SellerContent from '../../content/pages/consultations/motivated-seller';
import CreditContent from '../../content/pages/consultations/credit-consulting';

const INVESTOR_SNIPPET_LENGTH = 25;
const CREDIT_SNIPPET_LENGTH = 37;
const SELLER_SNIPPET_LENGTH = 37;

const snippet = (str, len) => {
  const spl = str.split(' ');
  const snip = spl.slice(0, len);
  return `${snip.join(' ')}...`;
}

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
      <div className="intro-big">
          <div className="intro pb-4 intro-half">
            <h1>{`Welcome to ${props.data.site.siteMetadata.title}`}</h1>
          </div>
          <div className="intro-half">
            <img id="mogul-logo" src="../marathon-logo.png" alt="Mogul Management Logo"/>
          </div>
      </div>
      <div className="container pt-8 pt-md-10">
        <div className="row justify-content-start">
          <div className="col-12">
            <h2 className="title-3 text-dark mb-3">Our Services</h2>
          </div>
          <div className="col-12 col-md-4 mb-1">
            <div className="card service service-teaser">
              <div className="card-content">
                <h2>
                  <Link to="consultations/credit-consulting">{ CreditContent.content.title }</Link>
                </h2>
                <p>{ snippet(CreditContent.content.paragraph, CREDIT_SNIPPET_LENGTH) }</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-1">
            <div className="card service service-teaser">
              <div className="card-content">
                <h2>
                  <Link to="consultations/motivated-seller">{ SellerContent.content.title }</Link>
                </h2>
                <p>{ snippet(SellerContent.content.paragraph, SELLER_SNIPPET_LENGTH) }</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-1">
            <div className="card service service-teaser">
              <div className="card-content">
                <h2>
                  <Link to="consultations/investor-consulting">{ InvestorContent.content.title }</Link>
                </h2>
                <p>{ snippet(InvestorContent.content.paragraph, INVESTOR_SNIPPET_LENGTH) }</p>
              </div>
            </div>
          </div>
        </div>
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
