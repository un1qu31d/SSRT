import React, {Component} from 'react';
import Styles from './index.module.scss';
import blueMailBox from './blue-mailbox.jpg';

class ConfirmationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleSubmit() {
    const {actions} = this.props;
    this.setState(_state => ({
      ..._state,
      submitting: true
    }));
    this.handleInputChange('confirmation', true);
    actions.nextStep();
  }

  handleBack() {
    const {actions} = this.props;
    actions.previousStep();
  }

  handleInputChange(item, value) {
    const {onInputChange} = this.props;
    onInputChange('confirmation', item, value);
  }

  render() {
    const {description} = this.props;
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['header']}>
          <div className={Styles['title']}>
            You are all set. Ready?
          </div>
        </div>
        <div className={Styles['main']}>
          <div className={Styles['message']}>
            <div className={Styles['image']}>
              <img src={blueMailBox} />
            </div>
            <div className={Styles['title']}>
              We will send a message for this e-mail
            </div>
            <div className={Styles['description']}>
              {description}
            </div>
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
              Confirm
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ConfirmationForm;