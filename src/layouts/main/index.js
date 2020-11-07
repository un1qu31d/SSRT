import React, {Component} from 'react';
import Styles from './index.module.scss';
import RegistrationSteps from '../../components/registration-steps';

class Main extends Component {
  render() {
    const classes = [];
    classes.push(Styles['layout']);
    return (
      <div className={classes.join()}>
        <section className={Styles['initial-screen']}>
          <section className={Styles['header']}>
          </section>
          <section className={Styles['main']}>
            <RegistrationSteps />
          </section>
        </section>
      </div>
    )
  }
}

export default Main;