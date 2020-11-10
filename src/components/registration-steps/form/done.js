import React, {Component} from 'react';
import Styles from './index.module.scss';
import csc from 'country-state-city';
import blueMailBox from './blue-mailbox.jpg';
import loader from './loader.gif';

class DoneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sending: false
    };
    this.handleSendData = this.handleSendData.bind(this);
  }

  sendData() {
    const {inputs} = this.props;
    const countryID = (csc.getAllCountries().find(_country => _country['sortname'] === inputs['company']['country']) ?? {id: ''})['id'];
    const cityID = (csc.getStatesOfCountry(countryID).find(_city => _city['name'] === inputs['company']['city']) ?? {id: ''})['id'];
    const formdata = new FormData();
    formdata.append("user_full_name", inputs['account']['fullName']);
    formdata.append("user_email", inputs['account']['businessEmail']);
    formdata.append("user_phone", inputs['account']['phoneNumber']);
    formdata.append("user_nationality", inputs['account']['country']);
    formdata.append("user_password", inputs['account']['password']);
    formdata.append("user_password_confirmation", inputs['account']['repeatedPassword']);
    formdata.append("user_position", "");
    formdata.append("user_extra_data[phone]", "");
    formdata.append("lang", inputs['company']['language']);
    formdata.append("company_name", inputs['company']['companyName']);
    formdata.append("company_address", inputs['company']['address']);
    formdata.append("company_business_email", inputs['company']['businessEmail']);
    formdata.append("company_phone", inputs['company']['phoneNumber']);
    formdata.append("company_extra_data[phone]", inputs['company']['altPhoneNumber']);
    formdata.append("company_country_id", countryID);
    formdata.append("company_city_id", cityID);
    // formdata.append("company_avatar", "", "");
    fetch("https://id.safav2.io.safavisa.com/register", {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    })
    .then(response => response.text())
    .then(result => {
      this.setState(_state => ({
        ..._state,
        loading: false,
        sending: true
      }));
    })
    .catch(error => {
      this.setState(_state => ({
        ..._state,
        loading: false,
        sending: false
      }));
    });
  }

  handleSendData() {
    this.setState(_state => ({
      ..._state,
      loading: true,
      sending: false
    }));
    this.sendData();
  }

  componentDidMount() {
    this.sendData();
  }

  render() {
    const {loading, sending} = this.state;
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['main']}>
          <div className={Styles['message']}>
            <div className={Styles['image']}>
              <img src={blueMailBox} alt="" />
            </div>
            {loading ? (
            <img src={loader} alt="" />
            ) : sending ? (
            <>
              <div className={Styles['label']}>
                Congratz, you successfully created your account
              </div>
              <div className={Styles['description']}>
                We just sent you a confirmation email
                <br />
                Please check your E-mail
              </div>
            </>
            ) : (
            <div className={Styles['note']}>
              There is an error happens please <span className={Styles['link']} onClick={this.handleSendData}>try</span> again later 
            </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default DoneForm;