import React from 'react';
import {
  Stepper, Step, StepContent, StepLabel, Button,
} from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";
import Layout from '../../layouts/index';
import SEO from '../../components/SEO';
import Forms from '../../components/Forms';
import JSONBasicForm from '../../../content/forms/basic-form';
import JSONInvestorForm from '../../../content/forms/investor-form';
import JSONInvestorPageContent from '../../../content/pages/consultations/investor-consulting';

const pStyle = {
  width: '66%',
};

const fieldStyle = {
  marginRight: '5px',
  marginTop: '5px',
}

const navButtonsGroupStyle = {
  marginTop: '20px',
}

class InvestorConsulting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formData: {},
      userInfo: {},
      userInfoMeta: {},
      completedSteps: {
        step0: false,
        step1: false,
      },
    };
    this.getFormValue = this.getFormValue.bind(this);
  }

  componentDidMount() {
    const formData = this.mergeFormData([JSONBasicForm.content, JSONInvestorForm.content]);
    this.setState({ formData: formData });
  }

  // eslint-disable-next-line react/sort-comp
  mergeFormData(formArr) {
    const fd = {}
    formArr.forEach((item) => {
      Object.keys(item).forEach((key) => {
        fd[key] = item[key];
      });
    });
    return fd;
  }

  flattenFormData(formData) {
    const ret = [];
    Object.keys(formData).map((key) => {
      formData[key].forEach((item) => {
        ret.push(item);
      });
    });
    return ret;
  }

  // eslint-disable-next-line class-methods-use-this
  getSteps = () => {
    return ['Tell us about yourself', 'Confirm'];
  }

  // eslint-disable-next-line class-methods-use-this
  getStepContent = (step) => {
    const { formData, userInfoMeta } = this.state;
    const errors = {};
    Object.keys(userInfoMeta).map((key) => {
      if (userInfoMeta[key] && userInfoMeta[key].error) {
        errors[key] = userInfoMeta[key].error;
      }
    });

    switch (step) {
      case 0:
        // Fill out user info
        return <Forms formData={formData}
                      handleChange={this.handleFormChange}
                      handleBlur={this.handleFormBlur}
                      getDefaultValue={this.getFormValue}
                      errors={errors}/>;
      case 1:
        return (
          <div>
            <h3>Please confirm that your information is correct before submitting.</h3>
          </div>
        );
      default:
        return 'Unknown Step';
    }
  }

  validateForm = () => {
    const { userInfoMeta, userInfo, formData } = this.state;
    const formValues = this.flattenFormData(formData);
    const { activeStep } = this.state;

    // check to see if the form is filled out correctly and the user can proceed.
    let validated = true;
    formValues.map((formField) => {
      const { id, required } = formField;
      // simple check for form completion and validation.
      if (required && (!userInfo[id] || (userInfoMeta[id].error && userInfoMeta[id].error.value))) {
        validated = false;
      }
    });
    if (validated) {
      this.setState((prevState) => {
        return {
          completedSteps: {
            ...prevState.completedSteps,
            [`step${activeStep}`]: true,
          },
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          completedSteps: {
            ...prevState.completedSteps,
            [`step${activeStep}`]: false,
          },
        };
      });
    }
  }

  validateFormFields = () => {
    const { userInfo, userInfoMeta, formData } = this.state;
    const emailMask = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const formValues = this.flattenFormData(formData);

    // first pass validation. Update values in userInfoMeta
    formValues.forEach((field) => {
      const { id, required } = field;
      if (userInfoMeta[id] && userInfoMeta[id].blurred) {
        // validate field since its been blurred
        if (required && userInfo[id].trim().length === 0) {
          // check if required field has been filled out.
          this.setState((prevState) => {
            return {
              userInfoMeta: {
                ...prevState.userInfoMeta,
                [id]: {
                  ...prevState.userInfoMeta[id],
                  error: {
                    value: true,
                    text: 'Field is required',
                  },
                },
              },
            };
          }, this.validateForm);
        } else if (id === 'phoneNumber' && userInfo[id].length < 12) {
          // test phone number format
          this.setState((prevState) => {
            return {
              userInfoMeta: {
                ...prevState.userInfoMeta,
                [id]: {
                  ...prevState.userInfoMeta[id],
                  error: {
                    value: true,
                    text: 'Invalid phone number format',
                  },
                },
              },
            };
          }, this.validateForm);
        } else if (id === 'addressZip' && userInfo[id].length < 5 && userInfo[id].length > 0) {
          // test zip code format
          this.setState((prevState) => {
            return {
              userInfoMeta: {
                ...prevState.userInfoMeta,
                [id]: {
                  ...prevState.userInfoMeta[id],
                  error: {
                    value: true,
                    text: 'Invalid zip code format',
                  },
                },
              },
            };
          }, this.validateForm);
        } else if (id === 'email' && !emailMask.test(userInfo[id])) {
          // test email address format
          this.setState((prevState) => {
            return {
              userInfoMeta: {
                ...prevState.userInfoMeta,
                [id]: {
                  ...prevState.userInfoMeta[id],
                  error: {
                    value: true,
                    text: 'Invalid email format',
                  },
                },
              },
            };
          }, this.validateForm);
        } else {
          // could not find anything wrong with this field value, set error to false and validate
          this.setState((prevState) => {
            return {
              userInfoMeta: {
                ...prevState.userInfoMeta,
                [id]: {
                  ...prevState.userInfoMeta[id],
                  error: {
                    value: false,
                    text: '',
                  },
                },
              },
            };
          }, this.validateForm);
        }
      }
    });
  }

  getFormValue(id) {
    // get form value by id from state
    const { userInfo } = this.state;
    return userInfo[id] || '';
  }

  handleFormBlur = (e) => {
    const { userInfoMeta } = this.state
    const { id, value, name } = e.target;
    const formID = id || name;

    if (!userInfoMeta[formID]) {
      // note that the field was blurred, and validate form
      this.setState((prevState) => {
        return {
          userInfo: {
            ...prevState.userInfo,
            [formID]: value,
          },
          userInfoMeta: {
            ...prevState.userInfoMeta,
            [formID]: {
              ...prevState.userInfoMeta[formID],
              blurred: true,
            },
          },
        };
      }, this.validateFormFields);
    } else {
      this.setState((prevState) => {
        return {
          userInfo: {
            ...prevState.userInfo,
            [formID]: value,
          },
        };
      }, this.validateFormFields);
    }
  }

  // eslint-disable-next-line react/sort-comp
  handleFormChange = (e) => {
    const { userInfoMeta } = this.state;
    const { id, value, name } = e.target;
    const formID = id || name;
    if (formID === 'addressState') {
      if (!userInfoMeta[formID]) {
        // note that the field was blurred, and validate form
        this.setState((prevState) => {
          return {
            userInfo: {
              ...prevState.userInfo,
              [formID]: value,
            },
            userInfoMeta: {
              ...prevState.userInfoMeta,
              [formID]: {
                ...prevState.userInfoMeta[formID],
                blurred: true,
              },
            },
          };
        }, this.validateFormFields);
      } else {
        this.setState((prevState) => {
          return {
            userInfo: {
              ...prevState.userInfo,
              [formID]: value,
            },
          };
        }, this.validateFormFields);
      }
    }
  }

  handleLastStep = () => {
    this.setState((lastState) => {
      return { activeStep: lastState.activeStep - 1 };
    });
  }

  handleNextStep = () => {
    this.setState((lastState) => {
      return { activeStep: lastState.activeStep + 1 };
    });
  }

  render() {
    const steps = this.getSteps();
    const { activeStep, completedSteps } = this.state;

    return (
      <Layout>
        <SEO title="Investor Consulting" />
        <div className="intro intro-small">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>{ JSONInvestorPageContent.content.title }</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div>
                <p className="page-paragraph">{ JSONInvestorPageContent.content.paragraph }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Stepper activeStep={ activeStep } orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  { this.getStepContent(index) }
                  <div style={navButtonsGroupStyle}>
                    { activeStep > 0 &&
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
                      disabled={ !completedSteps[`step${activeStep}`] }
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
      </Layout>
    );
  }
}

export default InvestorConsulting;
