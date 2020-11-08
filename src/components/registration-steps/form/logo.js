import React, {Component} from 'react';
import Styles from './index.module.scss';

class LogoForm extends Component {
  render() {
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
      </div>
    )
  }
}

export default LogoForm;