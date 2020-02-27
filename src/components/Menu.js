import React from 'react';
import { graphql, StaticQuery, Link, navigate } from 'gatsby';
import MaterialMenu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import JSONCreditContent from '../../content/pages/consultations/credit-consulting';
import JSONInvestorContent from '../../content/pages/consultations/investor-consulting';
import JSONSellerContent from '../../content/pages/consultations/motivated-seller';


class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultationsOpen: false,
      anchorEl: null,
    };
  }

  handleClick = (e) => {
    const { consultationsOpen } = this.state;
    this.setState({
      consultationsOpen: !consultationsOpen,
      anchorEl: e.currentTarget,
    });
  }

  handleClose = () => {
    this.setState({consultationsOpen: false});
  }

  handleLink = (path) => {
    this.handleClose();
    navigate(path);
  }

  render() {
    const { menuLinks } = this.props.data.site.siteMetadata;
    const { consultationsOpen, anchorEl } = this.state;
    return (
      <div id="main-menu" className="main-menu">
        <ul>
          {menuLinks.map(link => (
            <li key={link.name}>
              {
                link.name === 'Consultations'
                  ? <div>
                      <Button
                        onClick={this.handleClick}>
                        Consultations
                      </Button>
                      <MaterialMenu
                        id="consultations-menu"
                        open={consultationsOpen}
                        onClose={this.handleClose}
                        anchorEl={anchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                      >
                        <MenuItem onClick={() => {
                          this.handleLink('consultations/credit-consulting');
                        }}>
                            {JSONCreditContent.content.title}
                        </MenuItem>
                        <MenuItem onClick={() => {
                          this.handleLink('consultations/investor-consulting');
                        }}>
                            {JSONInvestorContent.content.title}
                        </MenuItem>
                        <MenuItem onClick={() => {
                          this.handleLink('consultations/motivated-seller');
                        }}>
                            {JSONSellerContent.content.title}
                        </MenuItem>
                      </MaterialMenu>
                    </div>
                  : <Link to={link.link}>{link.name}</Link>
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            menuLinks {
              name
              link
            }
          }
        }
      }
    `}
    render={data => <Menu data={data} />}
  />
);
