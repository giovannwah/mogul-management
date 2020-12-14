import React from 'react';
import { Link, navigate } from 'gatsby';
import { Button } from '@material-ui/core';
import SEO from '../../../components/SEO';
import Layout from '../../../layouts/index';

const MotivatedSellerInvestor = props => (
  <Layout bodyClass="page-contact">
    <SEO title="Motivated Sellers and Investors" />
    <div className="big-container">
    <div className="motivated-seller-container">
      <div className="motivated-seller-i-am">
        <p>Which option best describes you?</p>
      </div>
      <div id="mobile-home-buttons">
        <Button onClick={() => navigate("/consultations/motivated-seller-investor/motivated-seller")} className="mobile-home-button">Motivated Seller</Button>
        <Button onClick={() => navigate("/consultations/motivated-seller-investor/investor-criteria")} className="mobile-home-button">Investor</Button>
      </div>
    </div>
    </div>
  </Layout>
);

export default MotivatedSellerInvestor;
