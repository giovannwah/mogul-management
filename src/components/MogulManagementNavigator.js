import React from 'react';
import posed from 'react-pose';
import { navigate } from 'gatsby';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HomeContent from '../../content/pages/home/index';

const IconButton = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    scale: 1,
  },
  hover: {
    scale: 1.15,
  },
  press: {
    scale: 1.1,
  },
});

const IconTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#666',
    color: 'white',
    fontSize: 14,
  },
}))(Tooltip);

class MogulManagementNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (path) => {
    navigate(path);
  }

  render() {
    return (<div id="main-container">
              <div id="quote-container">
                <p className="quote"><span className="parens">"</span>I believe <span className="text-highlight">everyone</span> in the world is born with genius-level <span className="text-highlight">talent</span>. Apply yourself to whatever you’re genius at, and you can <span className="text-highlight">do anything</span> in the <span className="text-highlight">world</span>.<span className="parens">"</span></p>
              </div>
              <div id="secondary-container">
                <div id="top-container">
                  <div className="top-column">
                    <IconTooltip className="tooltip-div-bottom" arrow title="Investor Consulting" placement="top">
                      <IconButton onClick={() => this.handleClick("consultations/investor-consulting")}>
                        <img className="mogul-icon" id="mogul-logo-investor" src="../assets/Mogul-Management-Investor.svg" alt="Mogul Mangagement Investor Consulting"/>
                      </IconButton>
                    </IconTooltip>
                  </div>
                  <div className="top-column">
                    <IconTooltip className="tooltip-div-top" arrow title="Credit Repair" placement="top">
                      <IconButton onClick={() => this.handleClick("consultations/credit-consulting")}>
                        <img className="mogul-icon" id="mogul-logo-credit" src="../assets/Mogul-Management-Credit.svg" alt="Mogul Mangagement Credit Repair"/>
                      </IconButton>
                    </IconTooltip>
                  </div>
                  <div className="top-column">
                    <IconTooltip className="tooltip-div-bottom" arrow title="Motivated Seller" placement="top">
                      <IconButton onClick={() => this.handleClick("consultations/motivated-seller")}>
                        <img className="mogul-icon" id="mogul-logo-seller" src="../assets/Mogul-Management-Seller.svg" alt="Mogul Mangagement Motivated Seller"/>
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
              <div id="quotee-container">
                <p id="quotee" className="quote">{HomeContent.content.quote_by}</p>
              </div>
            </div>);
  }
}

export default MogulManagementNavigator;
