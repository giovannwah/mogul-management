import React from 'react';
import {
  Stepper, Step, StepContent, StepLabel, Button,
} from '@material-ui/core';
import SEO from './SEO';
import CheckCircleOutlineIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { Link } from 'gatsby';
import Layout from '../layouts';

class FormTemplate extends React.Component {
  constructor(props) {
    super(props);
    const { extendedState, steps } = props;
    this.state = {
      activeStep: 0,
      formData: {},
      userInfo: {},
      userInfoMeta: {},
      done: false,
    }
  }

  render() {
    const { getSteps, title, content } = this.props;
    const { activeStep, completedSteps, done } = this.state;
    const steps = getSteps();

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
                    <h1>{content.title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div>
                    <p className="page-paragraph">{content.paragraph}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index)}
                      <div style={navButtonsGroupStyle}>
                        {activeStep > 0 &&
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={this.handleLastStep}
                          style={fieldStyle}
                        >
                          Back
                        </Button>
                        }
                        <Button
                          disabled={!completedSteps[`step${activeStep}`]}
                          variant="contained"
                          color="primary"
                          onClick={this.handleNextStep}
                          style={fieldStyle}
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
    )
  }
}

export default FormTemplate;
