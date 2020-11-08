import React, {Component} from 'react';
import Styles from './index.module.scss';
import AccountFrom from './form/account';
import Steps from './steps';

class RegistrationSteps extends Component {
  render() {
    const classes = [];
    classes.push(Styles['registration-steps']);
    return (
      <div className={classes.join()}>
          <section className={Styles['steps-bar']}>
            <Steps />
          </section>
          <section className={Styles['form']}>
            <AccountFrom />
          </section>
      </div>
    )
  }
}

export default RegistrationSteps;