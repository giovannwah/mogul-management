import React from 'react';
import PropTypes from 'prop-types';

import {
  Stepper, Step, StepContent, StepLabel, Button,
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { Link } from 'gatsby';
import SEO from './SEO';
import Layout from '../layouts';
import { submitUserData } from '../utils/api';

const fieldStyle = {
  marginRight: '5px',
  marginTop: '5px',
}

const navButtonsGroupStyle = {
  marginTop: '20px',
}

const bold = {
  fontWeight: 'bold',
}

const sumSpace = {
  marginBottom: '4px',
}

class FormTemplate extends React.Component {
  // need step numbers, names, and content
  // Forms that use this should only have to provide the components for each
  // step, how to validate each step, whether to use recapcha, how to generate summary
  //
  // This obj should automatically create completed steps, handle back/forth navigation, handle form
  // submission, etc
  /*
    steps object,
    {
      step0:
      step1:
      .
      .
      .
    }
   */
  constructor(props) {
    super(props);
    this.state = this.setupState();
  }

  setupState = () => {
    return {
      activeStep: 0,
      completedSteps: this.getCompletedSteps(),
      done: false,
    };
  };

  getCompletedSteps = () => {
    const { stepsContent, autoConfirmation } = this.props;
    let completedSteps = [];
    for (let i = 0; i < stepsContent.length + (autoConfirmation ? 1 : 0); i++) {
      completedSteps.push(false);
    }
    return completedSteps;
  }

  getStepContentObject = () => {
    const { stepsContent, autoConfirmation } = this.props;
    if (autoConfirmation) {
      return [
        ...stepsContent,
        {
          label: 'Confirm',
          content: (<div>{ this.summary() }</div>),
        },
      ]
    }
    else {
      return stepsContent;
    }
  }

  summary = () => {
    const { getSummary } = this.props;
    return getSummary();
  }

  handleLastStep = () => {
    this.setState((lastState) => {
      return { activeStep: lastState.activeStep - 1 };
    });
  }

  handleNextStep = () => {
    const { activeStep, completedSteps } = this.state;
    if (activeStep === completedSteps.length - 1) {
      this.submitForm();
    }
    else {
      this.setState((lastState) => {
        return { activeStep: lastState.activeStep + 1 };
      });
    }
  }

  submitForm = () => {
    const { onSubmitClicked } = this.props;
    submitUserData(onSubmitClicked, this.callback);
  }

  callback = (response) => {
    console.log(response)
    this.setState({ done: true });
  }

  render() {
    const { title, paragraph } = this.props;
    const { activeStep, completedSteps, done } = this.state;

    const stepsContent = this.getStepContentObject();

    return (
      <Layout>
        <SEO title={ title } />
        {done ?
          <div style={{paddingTop: '100px', display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <h2>Thank you!</h2>
              <CheckCircleOutlineIcon style={{paddingLeft: '10px', width: '55px', height: '55px', color: 'green'}} fontSize="large"/>
            </div>
            <p style={{maxWidth: '500px', textAlign: 'center'}}>You should receive an email confirmation shortly. We look forward to doing business with you.</p>
            <Link to="/">Go to Home</Link>

          </div>
          :
          <div>
            <div className="intro intro-small">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <h1>{ title }</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div>
                    <p className="page-paragraph">{ paragraph }</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <Stepper activeStep={ activeStep } orientation="vertical">
                {stepsContent.map((step) => (
                  <Step key={step.label}>
                    <StepLabel>{step.label}</StepLabel>
                    <StepContent>
                      { step.content }
                      <div style={navButtonsGroupStyle}>
                        {activeStep > 0 &&
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.handleLastStep}
                          style={ fieldStyle }
                        >
                          Back
                        </Button>
                        }
                        <Button
                          disabled={!completedSteps[activeStep]}
                          variant="contained"
                          color="primary"
                          onClick={this.handleNextStep}
                          style={ fieldStyle }
                        >
                          {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                        </Button>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>
        }
      </Layout>
    );
  }
}

FormTemplate.propTypes = {
  stepsContent: PropTypes.array.isRequired,
  autoConfirmation: PropTypes.bool.isRequired,
  getSummary: PropTypes.func.isRequired,
  generateSubmitData: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  onSubmitClicked: PropTypes.func,
};

export default FormTemplate;
