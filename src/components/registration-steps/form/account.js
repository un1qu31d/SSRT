import React, {Component} from 'react';
import Styles from './index.module.scss';
import validator from 'validator';
import countries from 'country-list-js';
import PasswordInput from './inputs/password';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    const {inputs} = this.props;
    this.state = {
      submitting: false,
      countryCode: `${inputs['country'] ? `+${countries.findByIso2(inputs['country'])['dialing_code']}` : '+'}`
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleBusinessEmailChange = this.handleBusinessEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRepeatedPasswordChange = this.handleRepeatedPasswordChange.bind(this);
  }

  handleSubmit() {
    const {inputs, actions} = this.props;
    this.setState(_state => ({
      ..._state,
      submitting: true
    }));
    const validations = {
      fullName: this.validateFullName(inputs['fullName']),
      businessEmail: this.validateBusinessEmail(inputs['businessEmail']),
      country: this.validateCountry(inputs['country']),
      phoneNumber: this.validatePhoneNumber(inputs['phoneNumber']),
      password: this.validatePassword(inputs['password'], inputs['repeatedPassword']),
      repeatedPassword: this.validateRepeatedPassword(inputs['password'], inputs['repeatedPassword'])
    };
    if (!Object.values(validations).some(_validation => _validation !== true)) actions.nextStep();
  }

  handleInputChange(item, value) {
    const {onInputChange} = this.props;
    onInputChange('account', item, value);
  }

  handleFullNameChange(event) {
    this.handleInputChange('fullName', event.target.value);
  }

  handleBusinessEmailChange(event) {
    this.handleInputChange('businessEmail', event.target.value);
  }

  handleCountryChange(event) {
    this.handleInputChange('country', event.target.value);
    this.setState(_state => ({
      ..._state,
      countryCode: `+${countries.findByIso2(event.target.value)['dialing_code']}`
    }));
  }

  handlePhoneNumberChange(event) {
    this.handleInputChange('phoneNumber', event.target.value);
  }

  handlePasswordChange(event) {
    this.handleInputChange('password', event.target.value);
  }

  handleRepeatedPasswordChange(event) {
    this.handleInputChange('repeatedPassword', event.target.value);
  }

  validateFullName(fullName) {
    if (!fullName) return 1;
    return true;
  }

  validateBusinessEmail(businessEmail) {
    if (!businessEmail) return 1;
    if (!validator.isEmail(businessEmail)) return 2;
    return true;
  }
  
  validateCountry(country) {
    if (!country) return 1;
    return true;
  }
  
  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) return 1;
    if (!validator.isMobilePhone(phoneNumber)) return 2;
    return true;
  }

  validatePassword(password, repeatedPassword) {
    if (!password) return 1;
    if (password !== repeatedPassword) return 2;
    if (password.length < 6) return 3;
    return true;
  }

  validateRepeatedPassword(password, repeatedPassword) {
    if (!repeatedPassword) return 1;
    if (password !== repeatedPassword) return 2;
    if (password.length < 6) return 3;
    return true;
  }

  render() {
    const {submitting, countryCode} = this.state;
    const {inputs} = this.props;
    const validations = {
      fullName: this.validateFullName(inputs['fullName']),
      businessEmail: this.validateBusinessEmail(inputs['businessEmail']),
      country: this.validateCountry(inputs['country']),
      phoneNumber: this.validatePhoneNumber(inputs['phoneNumber']),
      password: this.validatePassword(inputs['password'], inputs['repeatedPassword']),
      repeatedPassword: this.validateRepeatedPassword(inputs['password'], inputs['repeatedPassword'])
    };
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['header']}>
          <div className={Styles['title']}>
            Tell us more about you.
          </div>
        </div>
        <div className={Styles['main']}>
          <div className={Styles['items']}>
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              if (submitting && validations['fullName'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      FULL NAME
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your full name"
                        value={inputs['fullName']}
                        onChange={this.handleFullNameChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['fullName'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your full name
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              if (submitting && validations['businessEmail'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      BUSINESS EMAIL
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your business email"
                        value={inputs['businessEmail']}
                        onChange={this.handleBusinessEmailChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['businessEmail'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your business email
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              if (submitting && validations['country'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      COUNTRY
                    </div>
                    <div className={Styles['input']}>
                      <select
                        className={!inputs['country'] ? Styles['status--empty'] : ''}
                        value={inputs['country']}
                        onChange={this.handleCountryChange}
                      >
                        <option value="" hidden>Select Your country</option>
                        {Object.values(countries.all).map(_country => (
                          <option key={_country['iso2']} value={_country['iso2']}>{_country['name']}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {(submitting && validations['country'] !== true) && (
                  <div className={Styles['note']}>
                    Please Select your country
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['type--prefix']);
              if (submitting && validations['phoneNumber'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['affix']}>
                      {countryCode}
                    </div>
                    <div className={Styles['label']}>
                      PHONE NUMBER
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your phone number"
                        value={inputs['phoneNumber']}
                        onChange={this.handlePhoneNumberChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['phoneNumber'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your phone number
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              if (submitting && validations['password'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      PASSWORD
                    </div>
                    <div className={Styles['input']}>
                      <PasswordInput
                        placeholder="Enter Your password"
                        value={inputs['password']}
                        onChange={this.handlePasswordChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['password'] === 1) && (
                  <div className={Styles['note']}>
                    Please Enter your password
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              if (submitting && validations['repeatedPassword'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      REPEAT PASSWORD
                    </div>
                    <div className={Styles['input']}>
                      <PasswordInput
                        placeholder="Enter Your password again"
                        value={inputs['repeatedPassword']}
                        onChange={this.handleRepeatedPasswordChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['repeatedPassword'] !== true) && (
                  <div className={Styles['note']}>
                    {(() => {
                      switch (validations['repeatedPassword']) {
                        case 1:
                          return 'Please Enter your password again';
                        case 2:
                          return 'Please Enter matched password';
                        case 3:
                          return 'Please make sure that you password at least 6 digits';
                        default:
                          return '';
                      }
                    })()}
                  </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
        <div className={Styles['footer']}>
          <div className={Styles['links']}>
            <div className={Styles['link']}>
              <a href="/">Back to login</a>
            </div>
          </div>
          <div className={Styles['options']}>
            <div className={`${Styles['option']} ${Styles['type--primary']}`} onClick={this.handleSubmit}>
              Next
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountForm;