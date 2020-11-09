import React, {Component} from 'react';
import Styles from './index.module.scss';
import AccountFrom from './form/account';
import Steps from './steps';

class RegistrationSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        account: {
          fullName: '',
          businessEmail: '',
          country: '',
          phoneNumber: '',
          password: '',
          repeatedPassword: ''
        }
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(form, item, value) {
    this.setState(_state => {
      _state['inputs'][form][item] = value;
      return _state;
    });
  }

  render() {
    const {inputs} = this.state;
    const classes = [];
    classes.push(Styles['registration-steps']);
    return (
      <div className={classes.join()}>
          <section className={Styles['steps-bar']}>
            <Steps />
          </section>
          <section className={Styles['form']}>
            <AccountFrom inputs={inputs['account']} onInputChange={this.handleInputChange} />
          </section>
      </div>
    )
  }
}

export default RegistrationSteps;