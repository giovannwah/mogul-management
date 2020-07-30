import React, { useState } from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';

const MenuMobile = props => {
  const { altMenuLinks } = props.data.site.siteMetadata;

  const getMenu = () => {
    return (
      altMenuLinks.map(link => (
          <li key={link.name}>
            <Link to={link.link}>{link.name}</Link>
          </li>
      )));
  };

  return (
    <div
      id="main-menu-mobile"
      className={`main-menu-mobile ${props.active ? 'open' : ''}`}
    >
      <ul>
        {
          getMenu()
        }
      </ul>
    </div>
  );
};

export default props => (
  <StaticQuery
    query={graphql`
      query MenuMobileQuery {
        site {
          siteMetadata {
            altMenuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <MenuMobile active={props.active} data={data} />}
  />
);
