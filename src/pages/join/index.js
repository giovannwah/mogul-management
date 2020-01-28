import React from 'react';
import SEO from '../../components/SEO';
import Layout from '../../layouts/index';
import ContentJSON from '../../../content/pages/join/index'

const pStyle = {
  width: '66%',
}

const Join = props => (
  <Layout bodyClass="page-contact">
    <SEO title="About" />
    <div className="intro intro-small">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>{ ContentJSON.content.title }</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div>
            <p className="page-paragraph">{ ContentJSON.content.paragraph1 }</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default Join;
