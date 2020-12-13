import React from 'react';
import { Link } from 'gatsby';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Layout from '../../layouts/index';

class Success extends React.Component {
  render() {
    return (
    <Layout>
      <div style={{paddingTop: '100px', display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <h2>Thank you!</h2>
          <CheckCircleOutlineIcon style={{paddingLeft: '10px', width: '55px', height: '55px', color: 'green'}} fontSize="large"/>
        </div>
        <p style={{maxWidth: '500px', textAlign: 'center'}}>You should receive an email confirmation shortly. We look forward to doing business with you.</p>
        <Link to="/">Go to Home</Link>
      </div>
    </Layout>
    );
  }
}

export default Success;
