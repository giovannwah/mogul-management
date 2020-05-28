import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const Package = props => (
  <div className="package-container">
    <button className={`package-button ${props.selected ? 'package-selected' : ''}`} onClick={() => props.handleClick(props.index)} >
      <div className="package-content">
        <h2 className="package-name">{ props.package.name }</h2>
        {/*<p className="package-description">{ props.package.description }</p>*/}
        <p className="package-price">
          <span className="package-price-dollar">${props.package.price.split('.')[0]}</span>
          <span className="package-price-cents">.{props.package.price.split('.')[1]}</span>
        </p>
        <p className="package-rate">{props.package.rate}</p>
      </div>
    </button>
  </div>
);

Package.propTypes = {
  package: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
}

const PackageGroup = props => (
  <div className="package-group-container">
    {
      props.packages.map((pkg, i) => (
        <Package key={pkg.name}
                 package={ pkg }
                 selected={ i === props.selectedPackage }
                 index={i}
                 handleClick={ props.handleClick }/>
      ))
    }
    {
      (props.packages.length <= 1) &&
      <div className="pkg-mcs"><i>More packages coming soon.</i></div>
    }
  </div>
);

PackageGroup.propTypes = {
  packages: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedPackage: PropTypes.number.isRequired,
};

export default PackageGroup;
