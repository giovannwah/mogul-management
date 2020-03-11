import React from 'react';
import { Link, graphql } from 'gatsby';
import {
  Stepper, Step, StepContent, StepLabel, Button,
} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
// import config from 'gatsby-plugin-config';
// import ReCAPTCHA from "react-google-recaptcha";
import Layout from '../../layouts/index';
import SEO from '../../components/SEO';
import PackageGroup from '../../components/PackageGroup';
import Forms from '../../components/Forms';
import SimpleCalendar from '../../components/SimpleCalendar';
import JSONBasicForm from '../../../content/forms/basic-form';
import JSONCreditForm from '../../../content/forms/credit-consultation-form';
import JSONCreditPageContent from '../../../content/pages/consultations/credit-consulting';
import PackageJSON from '../../../content/pages/consultations/packages';
import { test, submitUserData } from '../../utils/api';
import JSONContact from '../../../content/pages/contact/index';

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

const MIN_HOUR = 7;
const MAX_HOUR = 17;

class CreditConsulting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      selectedPackage: -1,
      formData: {},
      userInfo: {},
      dateTime: null,
      userInfoMeta: {},
      completedSteps: {
        step0: false,
        step1: false,
        step2: false,
        step3: true, //TODO: recaptcha on last step
      },
      done: false,
    };
    this.getFormValue = this.getFormValue.bind(this);
    this.onDateTimeChange = this.onDateTimeChange.bind(this);
    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    const formData = this.mergeFormData([JSONBasicForm.content, JSONCreditForm.content]);
    this.setState({ formData: formData });
  }

  getBusinessPhone() {
    return JSONContact.content.phone;
  }

  getBusinessEmail() {
    return this.props.data.site.siteMetadata.businessEmail;
  }

  // eslint-disable-next-line class-methods-use-this
  getSteps = () => {
    return ['Select your package',
            'Tell us about yourself',
            'Schedule your call to get started!',
            'Confirm'];
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

  validateSelectedDate(date) {
    // make sure that the selected date is a valid one for an appointment
    const today = new Date();
    if (date > today) {
      const hours = date.getHours();
      const mins = date.getMinutes();
      if (hours >= MIN_HOUR && hours <= MAX_HOUR && mins == 0) {
        return true;
      }
    }
    return false;
  }

  formatDateString(date) {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return `${date.toLocaleDateString("en-US", options)} at ${date.toLocaleTimeString('en-US')}`;
  }

  onDateTimeChange(date) {
    if (this.validateSelectedDate(date)) {
      this.setState({ dateTime: date }, () => {
        const { activeStep } = this.state;
        this.setState((prevState) => {
          return {
            completedSteps: {
              ...prevState.completedSteps,
              [`step${activeStep}`]: true,
            },
          }
        });
      });
    }
    else {
      this.setState({ dateTime: date})
    }
  }

  onCaptchaComplete() {
    const { activeStep } = this.state;
    this.setState((prevState) => {
      return {
        completedSteps: {
          ...prevState.completedSteps,
          [`step${activeStep}`]: true,
        },
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getStepContent = (step) => {
    const { credit_consulting } = PackageJSON.content.packages;
    const { selectedPackage, formData, userInfoMeta, dateTime } = this.state;
    const errors = {};
    Object.keys(userInfoMeta).map((key) => {
      if (userInfoMeta[key] && userInfoMeta[key].error) {
        errors[key] = userInfoMeta[key].error;
      }
    });

    switch (step) {
      case 0:
        // Select consulting package first
        return <PackageGroup packages={ credit_consulting }
                             handleClick={ this.onPackageSelect }
                             selectedPackage={ selectedPackage }/>;
      case 1:
        // Fill out user info
        return <Forms formData={formData}
                      handleChange={ this.handleFormChange }
                      handleBlur={ this.handleFormBlur }
                      getDefaultValue={ this.getFormValue }
                      errors={errors}
        />;
      case 2:
        // Select a date/time
        return <SimpleCalendar onChange={ this.onDateTimeChange }
                               selectedTime={ dateTime }
                               minTime={ MIN_HOUR }
                               maxTime={ MAX_HOUR }/>;
      case 3:
        // confirm info
        return (
          <div>
            {
              this.summary()
            }
            {/*<br/>*/}
            {/*<ReCAPTCHA*/}
            {/*  onChange={this.onCaptchaComplete}*/}
            {/*/>*/}
          </div>
        );
      default:
        return 'Unknown Step';
    }
  }

  generateSubmitData = (confirmationSubject) => {
    const { userInfo } = this.state;
    const userSubmittedData = this.consolidateUserInfo()
    const userEmail = userInfo['email']
    const userName = userInfo['firstName']
    const userSubject = `Mogul Management - ${ confirmationSubject } Confirmation`;
    const businessPhone = this.getBusinessPhone()
    const businessEmail = this.getBusinessEmail();
    const businessSubject = `Mogul Management - New ${ confirmationSubject } Request`;

    return {
      // format: {id: 'firstName', label: 'First Name', value: 'Kevin'}
      userSubmittedData: userSubmittedData,
      userEmail: userEmail,
      userName: userName,
      userSubject: userSubject,
      businessPhone: businessPhone,
      businessEmail: businessEmail,
      businessSubject: businessSubject,
    }
  }

  consolidateUserInfo = (extraInfo) => {
    const { userInfo, formData } = this.state;
    const fFormData = this.flattenFormData(formData);
    const ids = fFormData.map(f => f.id);
    const getById = (formData, id) => {
      return formData.filter(f => f.id === id)[0]
    };
    let disp = []
    if (extraInfo) {
      disp = [...extraInfo]
    }
    ids.map(id => {
      disp.push({
        id: id,
        label: getById(fFormData, id).label,
        value: userInfo[id] || 'N/A',
      });
    });

    return disp
  }

  summary = () => {
    const { dateTime } = this.state;
    const { credit_consulting } = PackageJSON.content.packages;
    const ex = []
    ex.push({id: 'package', label: "Selected package", value: credit_consulting[0].name})
    ex.push({id: 'time', label: "Selected appointment time", value: (dateTime ? this.formatDateString(dateTime) : null)})
    const disp = this.consolidateUserInfo(ex)

    return (
      <div>
        {
          disp.map(ans => {
              return (
                <div style={sumSpace} key={ans.id}>
                  <span style={bold}>{ `${ ans.label }: ` }</span>
                  <span>{ ans.value }</span>
                </div>
              );
            }
          )
        }
      </div>
    );
  }

  onPackageSelect = (index) => {
    this.setState((prevState) => {
      return {
        selectedPackage: index,
        completedSteps: {
          ...prevState.completedSteps,
          step0: true,
        },
      };
    });
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

  getFormValue(id) {
    // get form value by id from state
    const { userInfo } = this.state;
    return userInfo[id] || '';
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

  handleLastStep = () => {
    this.setState((lastState) => {
      return { activeStep: lastState.activeStep - 1 };
    });
  }

  handleNextStep = () => {
    const { activeStep, completedSteps } = this.state
    if (activeStep == Object.keys(completedSteps).length-1) {
      this.submitForm();
    }
    else {
      this.setState((lastState) => {
        return { activeStep: lastState.activeStep + 1 };
      });
    }
  }

  submitForm = () => {
    const submitData = this.generateSubmitData(JSONCreditPageContent.content.title)
    test(submitData, this.callback);
    this.setState({ done: true });
  }

  callback = (response) => {
    let x = 10;
  }

  render() {
    const steps = this.getSteps();
    const { activeStep, completedSteps, done } = this.state;
    return (
      <Layout>
        <SEO title="Credit Consultation" />
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
                    <h1>{JSONCreditPageContent.content.title}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div>
                    <p className="page-paragraph">{JSONCreditPageContent.content.paragraph}</p>
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
    );
  }
}


export const query = graphql`
  query {
    site {
      siteMetadata {
        businessEmail
      }
    }
  }
`;

export default CreditConsulting;
