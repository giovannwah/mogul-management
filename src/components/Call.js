import React from 'react';
import { SocialIcon } from 'react-social-icons';
import ContentJSON from '../../content/pages/contact/index'

const socialStyle = {
  display: 'inline',
  marginRight: '7px',
}

const address = {
  marginBottom: '2px',
}

const header = {
  marginTop: '15px',
}

const { content } = ContentJSON;

const Call = props => (
  <div className="call">
    <div className="call-box-top">
      <div style={header} className="call-phone">
        <strong>Phone</strong>
        <br/>
        <a href={`tel:${ content.phone }`}>
        { content.phone }
        </a>
      </div>
      <div style={header} className="call-email">
        <strong>Email</strong>
        <br/>
        <a href={`mailto:${ content.email }`}>
          { content.email }
        </a>
      </div>
      {/*<div style={header} className="call-email">*/}
      {/*  <strong style={header}>Mailing Address</strong>*/}
      {/*  <br/>*/}
      {/*  <p style={address}>{ content.address.street }</p>*/}
      {/*  <p style={address}>{ content.address.city_state_zip }</p>*/}
      {/*</div>*/}
      <div style={header} className="call-email">
        <strong style={header}>Follow us</strong>
        <br/>
        <div style={socialStyle}>
          <SocialIcon url={ content.social.facebook } />
        </div>
        <div style={socialStyle}>
          <SocialIcon url={ content.social.linkedin } />
        </div>
        <div style={socialStyle}>
          <SocialIcon url={ content.social.twitter } />
        </div>
        <div style={socialStyle}>
          <SocialIcon url={ content.social.instagram } />
        </div>
      </div>
    </div>
    {props.button && (
      <div className="call-box-bottom">
        <a href="/contact" className="button">
          Contact
        </a>
      </div>
    )}
  </div>
);

export default Call;
