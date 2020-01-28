import React from 'react';
import { graphql, Link, StaticQuery } from 'gatsby';
import Menu from './Menu';
import Hamburger from './Hamburger';
import logo from '../images/marathon-logo.png';
import logoMobile from '../images/logo-mobile.svg';
import MenuMobile from './MenuMobile';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    };
  }

  toggleMenu = menuActive => {
    this.setState(prevState => ({
      menuActive: !prevState.menuActive,
    }));
  };

  render() {
    const { title } = this.props.data.site.siteMetadata;
    return (
      <div className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <h1 className="banner">{ title }</h1>
            </Link>
          </div>
          <div className="logo-mobile">
            <Link to="/">
              <img alt="Homepage" src={logoMobile} />
            </Link>
          </div>
          <MenuMobile active={this.state.menuActive} />
          <Menu />
          <Hamburger toggleMenu={this.toggleMenu} />
        </div>
      </div>
    );
  }
}

export default props => (
  <StaticQuery
    query={
      graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `
    }
    render={data => <Header data={data} />}
  />
);
