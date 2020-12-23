import React from 'react';
import { Link, graphql } from 'gatsby';
import {
  Stepper, Step, StepContent, StepLabel, Button,
} from '@material-ui/core';
// import ReCAPTCHA from "react-google-recaptcha";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Loader from 'react-loader-spinner';
import Cookies from 'js-cookie';
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
import { TESTING } from '../../utils/constants';
import StripePayment from '../../components/StripePayment';

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
// hardcoded stripe ids for package prices
const BEGINNERS_PACKAGE_TEST_PRICE = 'price_1HxHB6EdAyTp7XFSeNMfkY0z';
const BEGINNERS_PACKAGE_LIVE_PRICE = 'price_1HwuYEEdAyTp7XFSoMMwlPk0';
const PACKAGE2_TEST_PRICE = 'price_1HxH9tEdAyTp7XFS2W3iNLaM';
const PACKAGE2_LIVE_PRICE = 'price_1HwudIEdAyTp7XFSHNBtwDX3';

class CreditConsulting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      activeStep: 0,
      selectedPackage: -1,
      packagePrice: '',
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

  getTesting() {
    return this.props.data.site.siteMetadata.testing;
  }

  getPaypalClientId() {
    // return this.getTesting() ? PAYPAL_SANDBOX_CLIENT_ID : PAYPAL_LIVE_CLIENT_ID;
    return PAYPAL_LIVE_CLIENT_ID;
  }

  getPaypalClientSecret() {
    return this.getTesting() ? PAYPAL_SANDBOX_CLIENT_SECRET : PAYPAL_LIVE_CLIENT_SECRET;
  }

  // eslint-disable-next-line class-methods-use-this
  getSteps = () => {
    return ['Select your package',
            'Tell us about yourself',
            'Schedule your call to get started!',
            'Confirm and checkout'];
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
      if (hours >= MIN_HOUR && hours <= MAX_HOUR && mins === 0) {
        return true;
      }
    }
    return false;
  }

  formatDateString(date) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let t = date.toLocaleTimeString('en-US');
    let time_spl = t.split(':');
    let ampm = time_spl[time_spl.length-1].split(' ')[1];
    let time = `${time_spl[0]}:${time_spl[1]}`;
    return `${date.toLocaleDateString("en-US", options)} at ${time} ${ampm}`;
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
          };
        });
      });
    }
    else {
      this.setState({ dateTime: date});
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

  stripePaymentOnClick = () => {
    const data = this.generateSubmitData(JSONCreditPageContent.content.title);
    // set up user submitted data cookie to expire in 8 hours
    Cookies.set('submittedUserData', data, { expires: (1 / 3) });
  };

  // eslint-disable-next-line class-methods-use-this
  getStepContent = (step) => {
    const { credit_consulting } = PackageJSON.content.packages;
    const { selectedPackage, packagePrice, formData, userInfoMeta, dateTime, userInfo } = this.state;
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
            <hr />
            <div id="payment-buttons">
              <StripePayment
                price={packagePrice}
                email={userInfo['email']}
                onClick={this.stripePaymentOnClick}/>
            </div>
          </div>
        );
      default:
        return 'Unknown Step';
    }
  }

  generateSubmitData = (confirmationSubject) => {
    const { userInfo, dateTime, selectedPackage } = this.state;
    const { credit_consulting } = PackageJSON.content.packages;
    const ex = [];
    const pkg = selectedPackage === -1 ? 0 : selectedPackage;
    ex.push({ id: 'package', label: "Selected package", value: `${credit_consulting[pkg].name} ($${credit_consulting[pkg].price} fee)` });
    ex.push({ id: 'orderID', label: "Transaction ID", value: userInfo.orderID });
    ex.push({ id: 'time', label: "Selected appointment time", value: (dateTime ? this.formatDateString(dateTime) : null) });
    // consolidateUserInfo only joins together form elements from form data. If any data is in state thats needs to be consolidated, it
    // should go in the "extraInfo" object.
    // userSubmittedData format: [{id: 'firstName', label: 'First Name', value: 'Kevin'}, ...]
    const userSubmittedData = this.consolidateUserInfo(ex);
    const userEmail = userInfo['email'];
    const userName = userInfo['firstName'];
    const userSubject = `KMM Enterprise - ${confirmationSubject} Confirmation`;
    const businessPhone = this.getBusinessPhone();
    const businessEmail = this.getBusinessEmail();
    const businessSubject = `KMM Enterprise - New ${confirmationSubject} Request`;

    return {
      userSubmittedData,
      userEmail,
      userName,
      userSubject,
      businessPhone,
      businessEmail,
      businessSubject,
    };
  };

  consolidateUserInfo = (extraInfo) => {
    const { userInfo, formData } = this.state;
    const fFormData = this.flattenFormData(formData);
    const ids = fFormData.map(f => f.id);
    const getById = (formData, id) => {
      let fd = formData.filter(f => f.id === id)
      if (fd.length) {
        return fd[0];
      }
      return null;
    };
    let disp = []
    if (extraInfo) {
      disp = [...extraInfo];
    }
    ids.map(id => {
      disp.push({
        id: id,
        label: getById(fFormData, id).label || id,
        value: userInfo[id] || 'N/A',
      });
    });

    return disp;
  }

  summary = () => {
    const { dateTime, selectedPackage } = this.state;
    const { credit_consulting } = PackageJSON.content.packages;
    const ex = []
    const pkg = selectedPackage === -1 ? 0 : selectedPackage;
    ex.push({ id: 'package', label: "Selected package", value: `${credit_consulting[pkg].name} ($${credit_consulting[pkg].price} fee)` });
    ex.push({ id: 'time', label: "Selected appointment time", value: (dateTime ? this.formatDateString(dateTime) : null) });
    const disp = this.consolidateUserInfo(ex);

    return (
      <div>
        {
          disp.map((ans) => {
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

  onPaymentSuccess = (data) => {
    /**
     * Submit order ID and submit form
     */
    this.setState((prevState) => {
      return {
        loading: true,
        userInfo: {
          ...prevState.userInfo,
          orderID: data.orderID,
        },
      };
    }, this.submitForm);
  };

  onPackageSelect = (index) => {
    const price = index === 0 ?
      (TESTING ? BEGINNERS_PACKAGE_TEST_PRICE : BEGINNERS_PACKAGE_LIVE_PRICE) :
      (TESTING ? PACKAGE2_TEST_PRICE : PACKAGE2_LIVE_PRICE);

    this.setState((prevState) => {
      return {
        packagePrice: price,
        selectedPackage: index,
        completedSteps: {
          ...prevState.completedSteps,
          step0: true,
        },
      };
    });
  };

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
  };

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
  };

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
  };

  handleFormBlur = (e) => {
    /**
     * TODO: Validate form on form blur
     */
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
  };

  handleLastStep = () => {
    this.setState((lastState) => {
      return { activeStep: lastState.activeStep - 1 };
    });
  };

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
  };

  submitForm = () => {
    /**
     * Submit form for processing
     * @type {{businessEmail: *, businessSubject: *, userSubmittedData: *, userEmail: *, businessPhone: *, userName: *, userSubject: *}}
     */
    const submitData = this.generateSubmitData(JSONCreditPageContent.content.title);

    if (this.getTesting()){
       test(submitData, this.callback);
    }
    else {
      submitUserData(submitData, this.callback);
    }
  };

  callback = (response) => {
    /**
     * Called after form submission
     */
    this.setState({ done: true, loading: false });
  };

  creditConsultingContent = () => {
    const { activeStep, completedSteps, done } = this.state;
    const steps = this.getSteps();
    if (done) {
      return (
        <div style={{paddingTop: '100px', display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <h2>Thank you!</h2>
            <CheckCircleOutlineIcon style={{paddingLeft: '10px', width: '55px', height: '55px', color: 'green'}} fontSize="large"/>
          </div>
          <p style={{maxWidth: '500px', textAlign: 'center'}}>You should receive an email confirmation shortly. We look forward to doing business with you.</p>
          <Link to="/">Go to Home</Link>

        </div>);
    }
    return (
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
          <Stepper activeStep={activeStep} orientation={"horizontal"}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  {this.getStepContent(index)}
                  <div style={navButtonsGroupStyle}>
                    {
                      activeStep > 0 &&
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleLastStep}
                        style={fieldStyle}
                      >
                        Back
                      </Button>
                    }
                    {
                      activeStep < steps.length - 1 &&
                      <Button
                        disabled={!completedSteps[`step${activeStep}`]}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNextStep}
                        style={fieldStyle}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    }
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
    );
  }

  getLoader = () => {
    const { loading } = this.state;
    return (
      <div style={{
        width: '100%',
        height: '300',
        paddingTop: '200',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Loader type="ThreeDots"
                color="#000"
                visible={ loading }
                height="100"
                width="100"/>
      </div>
    );
  }

  contentWithLoader = () => {
    const { loading } = this.state;
    if (loading) {
      return this.getLoader();
    }
    return this.creditConsultingContent();
  }

  render() {
    return (
      <Layout>
        <SEO title="Credit Consultation" />
          {
            this.contentWithLoader()
          }
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        testing      
        businessEmail
      }
    }
  }
`;

export default CreditConsulting;
