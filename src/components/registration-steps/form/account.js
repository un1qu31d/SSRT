import React, {Component} from 'react';
import Styles from './index.module.scss';
import validator from 'validator';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      countryCode: '+'
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
    this.setState(_state => ({
      ..._state,
      submitting: true
    }));
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

  validateFullName(value) {
    if (!value) return false;
    return true;
  }

  validateBusinessEmail(value) {
    if (!value) return false;
    if (!validator.isEmail(value)) return false;
    return true;
  }

  validateCountry(value) {
    if (!value) return false;
    return true;
  }

  validatePhoneNumber(value) {
    if (!value) return false;
    return true;
  }

  validatePassword(value) {
    if (!value) return false;
    return true;
  }

  validateRepeatedPassword(value) {
    if (!value) return false;
    return true;
  }

  render() {
    const {submitting, countryCode} = this.state;
    const {inputs} = this.props
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
              if (submitting && !this.validateFullName(inputs['fullName'])) itemClasses.push(Styles['theme--error']);
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
                  {submitting && (
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
              if (submitting && !this.validateBusinessEmail(inputs['businessEmail'])) itemClasses.push(Styles['theme--error']);
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
                  {submitting && (
                  <div className={Styles['note']}>
                    Please Enter your business email
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              if (submitting && !this.validateCountry(inputs['country'])) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      COUNTRY
                    </div>
                    <div className={Styles['input']}>
                      <select
                        className={Styles['status--empty']}
                        defaultValue=""
                        value={inputs['country']}
                        onChange={this.handleCountryChange}
                      >
                        <option value="" hidden>Select Your country</option>
                        <option value="egypt">Egypt</option>
                      </select>
                    </div>
                  </div>
                  {submitting && (
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
              if (submitting && !this.validatePhoneNumber(inputs['phoneNumber'])) itemClasses.push(Styles['theme--error']);
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
                  {submitting && (
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
              if (submitting && !this.validatePassword(inputs['password'])) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      PASSWORD
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your password"
                        value={inputs['password']}
                        onChange={this.handlePasswordChange}
                      />
                    </div>
                  </div>
                  {submitting && (
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
              if (submitting && !this.validateRepeatedPassword(inputs['repeatedPassword'])) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      REPEAT PASSWORD
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your password again"
                        value={inputs['repeatedPassword']}
                        onChange={this.handleRepeatedPasswordChange}
                      />
                    </div>
                  </div>
                  {submitting && (
                  <div className={Styles['note']}>
                    Please Enter your password again
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
              <a href="">Back to login</a>
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