import React from 'react';
import SEO from '../../../components/SEO';
import Layout from '../../../layouts/index';
import { Link, navigate } from 'gatsby';
import JSONSellerContent from '../../../../content/pages/consultations/motivated-seller';
import JSONInvestorContent from '../../../../content/pages/consultations/investor-criteria';
import JSONFundingPageContent from '../../../../content/pages/consultations/funding';

const MotivatedSellerInvestor = props => (
  <Layout bodyClass="page-contact">
    <SEO title="Motivated Sellers and Investors" />
    <div>
      <div className="intro intro-small">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>I am a...</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Link to="/consultations/motivated-seller-investor/motivated-seller">Motivated Seller</Link>
        </div>
        <div>
          <Link to="/consultations/motivated-seller-investor/investor-criteria">Investor</Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default MotivatedSellerInvestor;
