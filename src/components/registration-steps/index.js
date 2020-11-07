import React, {Component} from 'react';
import Styles from './index.module.scss';

class RegistrationSteps extends Component {
  render() {
    const classes = [];
    classes.push(Styles['registration-steps']);
    return (
      <div className={classes.join()}>
          <section className={Styles['steps-bar']}>
          </section>
          <section className={Styles['form']}>
          </section>
      </div>
    )
  }
}

export default RegistrationSteps;