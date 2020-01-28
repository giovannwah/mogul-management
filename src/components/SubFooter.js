import React from 'react';
import ContentJSON from '../../content/pages/contact/index';

const SubFooter = props => (
  <div className="sub-footer-strip">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="sub-footer">
            <ul>
              <li>
                <strong>Phone: </strong>
                { ContentJSON.content.phone }
              </li>
              <li>
                <strong>Email: </strong>
{' '}
                <a href={`mailto:${ ContentJSON.content.email }`}>
                  { ContentJSON.content.email }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SubFooter;
