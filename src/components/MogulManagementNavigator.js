import React from 'react';
import posed from 'react-pose';
import { navigate, Link } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Quote from './Quote';
import HomeContent from '../../content/pages/home/index';
import InvestorJSON from '../../content/pages/consultations/investor-criteria'
import CreditJSON from '../../content/pages/consultations/credit-consulting'
import SellerJSON from '../../content/pages/consultations/motivated-seller'

// Button animation
const IconButton = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  press: {
    scale: 1.15,
  },
});

const IconTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#111',
    color: 'white',
    fontSize: 14,
    letterSpacing: '1px',
    fontFamily: 'Darker Grotesque',
    textTransform: 'uppercase',
    borderRadius: 0,
  },
}))(Tooltip);

const handleClick = (path) => {
  navigate(path);
};

const MogulManagementNavigator = props => (
  <div>
    <div id="main-container">
      <div id="mc-left-half">
        <div id="quote-container">
          <Quote
            quote={ HomeContent.content.quote }
            quotee={ HomeContent.content.quote_by }
            keywords={ HomeContent.content.keywords }
            skip={HomeContent.content.skip_first}
          />
        </div>
      </div>
      <div id="mc-right-half">
        <div id="home-sep" />
        <div id="secondary-container">
          <div id="top-container">
            <div className="top-column">
              <IconTooltip className="tooltip-div-bottom" arrow title={ InvestorJSON.content.title } placement="top">
                <IconButton onClick={() => handleClick("consultations/investor-consulting")}>
                  <img className="mogul-icon" id="mogul-logo-investor" src="../assets/Mogul-Management-Logo-04.svg" alt="Mogul Mangagement Investor Consulting"/>
                </IconButton>
              </IconTooltip>
            </div>
            <div className="top-column">
              <IconTooltip className="tooltip-div-top" arrow title={ CreditJSON.content.title } placement="top">
                <IconButton onClick={() => handleClick("consultations/credit-consulting")}>
                  <img className="mogul-icon" id="mogul-logo-credit" src="../assets/Mogul-Management-Logo-02.svg" alt="Mogul Mangagement Credit Repair"/>
                </IconButton>
              </IconTooltip>
            </div>
            <div className="top-column">
              <IconTooltip className="tooltip-div-bottom" arrow title={ SellerJSON.content.title } placement="top">
                <IconButton onClick={() => handleClick("consultations/motivated-seller")}>
                  <img className="mogul-icon" id="mogul-logo-seller" src="../assets/Mogul-Management-Logo-03.svg" alt="Mogul Mangagement Motivated Seller"/>
                </IconButton>
              </IconTooltip>
            </div>
          </div>
          <div id="bottom-container">
            <div>
              <img id="mogul-logo-main" src="../assets/Mogul-Management-Logo-01.svg" alt="Mogul Mangagement Main"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="learn-about-us"><Link to="/about">LEARN ABOUT US</Link></div>
  </div>
);

export default MogulManagementNavigator;
