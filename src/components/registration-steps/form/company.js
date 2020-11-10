import React, {Component} from 'react';
import Styles from './index.module.scss';
import validator from 'validator';
import countries from 'country-list-js';
import csc from 'country-state-city';

class CompanyForm extends Component {
  constructor(props) {
    super(props);
    const {inputs} = this.props;
    this.state = {
      submitting: false,
      countryCode: `${inputs['country'] ? `+${countries.findByIso2(inputs['country'])['dialing_code']}` : '+'}`,
      cities: inputs['country'] ? csc.getStatesOfCountry((csc.getAllCountries().find(_country => _country['sortname'] === inputs['country']) ?? {id: ''})['id']) : []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleBusinessEmailChange = this.handleBusinessEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleAltPhoneNumberChange = this.handleAltPhoneNumberChange.bind(this);
  }

  handleSubmit() {
    const {inputs, actions} = this.props;
    this.setState(_state => ({
      ..._state,
      submitting: true
    }));
    const validations = {
      companyName: this.validateCompanyName(inputs['companyName']),
      address: this.validateAddress(inputs['address']),
      businessEmail: this.validateBusinessEmail(inputs['businessEmail']),
      country: this.validateCountry(inputs['country']),
      city: this.validateCity(inputs['country'], inputs['city']),
      phoneNumber: this.validatePhoneNumber(inputs['phoneNumber']),
      altPhoneNumber: this.validateAltPhoneNumber(inputs['altPhoneNumber'])
    };
    if (!Object.values(validations).some(_validation => _validation !== true)) actions.nextStep();
  }

  handleBack() {
    const {actions} = this.props;
    actions.previousStep();
  }

  handleInputChange(item, value) {
    const {onInputChange} = this.props;
    onInputChange('company', item, value);
  }

  handleCompanyNameChange(event) {
    this.handleInputChange('companyName', event.target.value);
  }

  handleAddressChange(event) {
    this.handleInputChange('address', event.target.value);
  }

  handleBusinessEmailChange(event) {
    this.handleInputChange('businessEmail', event.target.value);
  }

  handleCountryChange(event) {
    this.handleInputChange('country', event.target.value);
    this.handleInputChange('city', '');
    this.setState(_state => ({
      ..._state,
      countryCode: `+${countries.findByIso2(event.target.value)['dialing_code']}`,
      cities: csc.getStatesOfCountry((csc.getAllCountries().find(_country => _country['sortname'] === event.target.value) ?? {id: ''})['id'])
    }));
  }

  handleCityChange(event) {
    this.handleInputChange('city', event.target.value);
  }

  handlePhoneNumberChange(event) {
    this.handleInputChange('phoneNumber', event.target.value);
  }

  handleAltPhoneNumberChange(event) {
    this.handleInputChange('altPhoneNumber', event.target.value);
  }

  validateCompanyName(companyName) {
    if (!companyName) return 1;
    return true;
  }
  
  validateAddress(address) {
    if (!address) return 1;
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
  
  validateCity(country, city) {
    const {cities} = this.state;
    if (!country) return 1;
    if (!city && cities.length) return 2;
    return true;
  }
  
  validatePhoneNumber(phoneNumber) {
    if (!phoneNumber) return 1;
    if (!validator.isMobilePhone(phoneNumber)) return 2;
    return true;
  }
  
  validateAltPhoneNumber(altPhoneNumber) {
    if (!altPhoneNumber) return 1;
    if (!validator.isMobilePhone(altPhoneNumber)) return 2;
    return true;
  }

  render() {
    const {submitting, countryCode, cities} = this.state;
    const {inputs} = this.props;
    const validations = {
      companyName: this.validateCompanyName(inputs['companyName']),
      address: this.validateAddress(inputs['address']),
      businessEmail: this.validateBusinessEmail(inputs['businessEmail']),
      country: this.validateCountry(inputs['country']),
      city: this.validateCity(inputs['country'], inputs['city']),
      phoneNumber: this.validatePhoneNumber(inputs['phoneNumber']),
      altPhoneNumber: this.validateAltPhoneNumber(inputs['altPhoneNumber'])
    };
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['header']}>
          <div className={Styles['title']}>
            Verify your compnay.
          </div>
        </div>
        <div className={Styles['main']}>
          <div className={Styles['title']}>
            Entring this information corectlly will facilitate the compnay verfication proccess
          </div>
          <div className={Styles['items']}>
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              itemClasses.push(Styles['type--suffix']);
              if (submitting && validations['companyName'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['affix']}>
                      <select
                        className={!inputs['language'] ? Styles['status--empty'] : ''}
                        defaultValue={inputs['language']}
                      >
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div className={Styles['label']}>
                      COMPANY NAME
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your company name"
                        value={inputs['companyName']}
                        onChange={this.handleCompanyNameChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['companyName'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your company name
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              if (submitting && validations['address'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      ADDRESS
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your address"
                        value={inputs['address']}
                        onChange={this.handleAddressChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['address'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your address
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
              if (!inputs['country']) itemClasses.push(Styles['theme--disabled']);
              if (submitting && validations['city'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['label']}>
                      CITY
                    </div>
                    <div className={Styles['input']}>
                      <select
                        className={!inputs['city'] ? Styles['status--empty'] : ''}
                        value={inputs['city']}
                        onChange={this.handleCityChange}
                        disabled={!inputs['country']}
                      >
                        <option value="" hidden>Select Your city</option>
                        {cities.map(_city => (
                          <option key={_city['id']} value={_city['name']}>{_city['name']}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {(submitting && validations['city'] !== true) && (
                  <div className={Styles['note']}>
                    {(() => {
                      switch (validations['city']) {
                        case 1:
                          return 'Please Select your country first';
                        case 2:
                          return 'Please Select your city';
                        default:
                          return '';
                      }
                    })()}
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
                      COMPANY PHONE NUMBER
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your company phone number"
                        value={inputs['phoneNumber']}
                        onChange={this.handlePhoneNumberChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['phoneNumber'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your company phone number
                  </div>
                  )}
                </div>
              )
            })()}
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['type--prefix']);
              if (submitting && validations['altPhoneNumber'] !== true) itemClasses.push(Styles['theme--error']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['field']}>
                    <div className={Styles['affix']}>
                      {countryCode}
                    </div>
                    <div className={Styles['label']}>
                      COMPANY PHONE NUMBER
                    </div>
                    <div className={Styles['input']}>
                      <input
                        type="text"
                        placeholder="Enter Your company phone number"
                        value={inputs['altPhoneNumber']}
                        onChange={this.handleAltPhoneNumberChange}
                      />
                    </div>
                  </div>
                  {(submitting && validations['altPhoneNumber'] !== true) && (
                  <div className={Styles['note']}>
                    Please Enter your company phone number
                  </div>
                  )}
                </div>
              )
            })()}
          </div>
        </div>
        <div className={Styles['footer']}>
          <div className={Styles['links']}>
          </div>
          <div className={Styles['options']}>
            <div className={`${Styles['option']}`} onClick={this.handleBack}>
              Back
            </div>
            <div className={`${Styles['option']} ${Styles['type--primary']}`} onClick={this.handleSubmit}>
              Next
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanyForm;