import React, {Component} from 'react';
import Styles from './index.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-regular-svg-icons';

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordVisible: false
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  handleButtonPress() {
    this.setState(_state => ({
      ..._state,
      isPasswordVisible: true
    }));
  }

  handleButtonRelease() {
    this.setState(_state => ({
      ..._state,
      isPasswordVisible: false
    }));
  }

  render() {
    const {props} = this;
    const {isPasswordVisible} = this.state;
    const showPasswordOptionClasses = [];
    showPasswordOptionClasses.push(Styles['option']);
    if (isPasswordVisible) showPasswordOptionClasses.push(Styles['status--active']);
    return (
      <div className={Styles['input']}>
        <input {...props} type={isPasswordVisible ? 'text' : 'password'} />
        <div className={Styles['options']}>
          <div
            className={showPasswordOptionClasses.join(' ')}
            onTouchStart={this.handleButtonPress}
            onTouchEnd={this.handleButtonRelease}
            onMouseDown={this.handleButtonPress}
            onMouseUp={this.handleButtonRelease}
            onMouseLeave={this.handleButtonRelease}
          >
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordInput;