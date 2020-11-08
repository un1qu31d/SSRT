import React, {Component} from 'react';
import Styles from './index.module.scss';

class ConfirmationForm extends Component {
  render() {
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
      </div>
    )
  }
}

export default ConfirmationForm;