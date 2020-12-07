import React from 'react';
import SEO from '../../components/SEO';
import Layout from '../../layouts/index';
import { Link } from 'gatsby';
import JSONCreditContent from '../../../content/pages/consultations/credit-consulting';
import JSONFundingContent from '../../../content/pages/consultations/funding';
// import JSONSellerContent from '../../../content/pages/consultations/motivated-seller';

const Consultations = props => (
  <Layout bodyClass="page-contact">
    <SEO title="Contact" />
        <div className="intro intro-small">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Consultations</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-8 pt-md-10">
          <div className="row justify-content-start">
            <div className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <Link to="consultations/credit-consulting">{ JSONCreditContent.content.title }</Link>
                  </h2>
                    <p>{ JSONCreditContent.content.paragraph }</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <Link to="consultations/motivated-seller-investor">Motivated Sellers and Investors</Link>
                  </h2>
                  <p></p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-1">
              <div className="card service service-teaser">
                <div className="card-content">
                  <h2>
                    <Link to="consultations/funding">{ JSONFundingContent.content.title }</Link>
                  </h2>
                  <p>{ JSONFundingContent.content.paragraph }</p>
                </div>
              </div>
            </div>
          </div>
    </div>
  </Layout>
);

export default Consultations;
