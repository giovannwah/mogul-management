import React from 'react';
import SEO from '../../../components/SEO';
import Layout from '../../../layouts/index';
import { Link, navigate } from 'gatsby';

const MotivatedSellerInvestor = props => (
  <Layout bodyClass="page-contact">
    <SEO title="Motivated Sellers and Investors" />
    <div className="big-container">
    <div className="motivated-seller-container">
      <div className="motivated-seller-i-am">
        <h1>I am</h1>
      </div>
      <div className="motivated-seller-link-container">
        <div className="motivated-seller-link">
          <Link to="/consultations/motivated-seller-investor/motivated-seller">a Motivated Seller</Link>
        </div>
        <div className="motivated-seller-link">
          <Link to="/consultations/motivated-seller-investor/investor-criteria">an Investor</Link>
        </div>
      </div>
    </div>
    </div>
  </Layout>
);

export default MotivatedSellerInvestor;
