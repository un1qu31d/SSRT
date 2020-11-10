import React, {Component} from 'react';
import Styles from './index.module.scss';
import AccountFrom from './form/account';
import CompanyFrom from './form/company';
import LogoFrom from './form/logo';
import ConfirmationFrom from './form/confirmation';
import DoneFrom from './form/done';
import Steps from './steps';

class RegistrationSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      inputs: {
        account: {
          fullName: '',
          businessEmail: '',
          country: '',
          phoneNumber: '',
          password: '',
          repeatedPassword: ''
        },
        company: {
          language: 'en',
          companyName: '',
          address: '',
          businessEmail: '',
          country: '',
          city: '',
          phoneNumber: '',
          altPhoneNumber: '',
        },
        logo: {
        },
        confirmation: {
          confirmation: false
        }
      },
      done: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.changeCurrentStep = this.changeCurrentStep.bind(this);
    this.changeCurrentStepToAccount = this.changeCurrentStepToAccount.bind(this);
    this.changeCurrentStepToCompany = this.changeCurrentStepToCompany.bind(this);
    this.changeCurrentStepToLogo = this.changeCurrentStepToLogo.bind(this);
    this.changeCurrentStepToConfirmations = this.changeCurrentStepToConfirmations.bind(this);
    this.changeCurrentStepToDone = this.changeCurrentStepToDone.bind(this);
  }

  changeCurrentStepToAccount() {
    this.changeCurrentStep(1);
  }

  changeCurrentStepToCompany() {
    this.changeCurrentStep(2);
  }
  
  changeCurrentStepToLogo() {
    this.changeCurrentStep(3);
  }
  
  changeCurrentStepToConfirmations() {
    this.changeCurrentStep(4);
  }

  changeCurrentStepToDone() {
    this.setState(_state => ({
      ..._state,
      done: true
    }));
  }

  changeCurrentStep(currentStep) {
    this.setState(_state => ({
      ..._state,
      currentStep
    }));
  }

  handleInputChange(form, item, value) {
    this.setState(_state => {
      _state['inputs'][form][item] = value;
      return _state;
    });
  }

  render() {
    const {inputs, currentStep, done} = this.state;
    const classes = [];
    classes.push(Styles['registration-steps']);
    return done ? (
      <DoneFrom inputs={inputs} />
    ) : (
      <div className={classes.join()}>
          <section className={Styles['steps-bar']}>
            <Steps currentStep={currentStep} />
          </section>
          <section className={Styles['form']}>
            {(() => {
              switch (currentStep) {
                case 1:
                  return <AccountFrom
                    inputs={inputs['account']}
                    onInputChange={this.handleInputChange}
                    actions={{
                      nextStep: this.changeCurrentStepToCompany
                    }}
                  />
                case 2:
                  return <CompanyFrom
                    inputs={inputs['company']}
                    onInputChange={this.handleInputChange}
                    actions={{
                      previousStep: this.changeCurrentStepToAccount,
                      nextStep: this.changeCurrentStepToLogo
                    }}
                  />
                case 3:
                  return <LogoFrom
                    inputs={inputs['logo']}
                    onInputChange={this.handleInputChange}
                    actions={{
                      previousStep: this.changeCurrentStepToCompany,
                      nextStep: this.changeCurrentStepToConfirmations
                    }}
                  />
                case 4:
                  return <ConfirmationFrom
                    inputs={inputs['confirmation']}
                    onInputChange={this.handleInputChange}
                    actions={{
                      previousStep: this.changeCurrentStepToLogo,
                      nextStep: this.changeCurrentStepToDone
                    }}
                    description={inputs['account']['businessEmail']}
                  />
                default:
              }
            })()}
          </section>
      </div>
    )
  }
}

export default RegistrationSteps;