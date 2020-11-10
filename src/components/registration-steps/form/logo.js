import React, {Component} from 'react';
import Styles from './index.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faImages} from '@fortawesome/free-regular-svg-icons';

class LogoForm extends Component {
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
    actions.nextStep();
  }

  handleBack() {
    const {actions} = this.props;
    actions.previousStep();
  }

  render() {
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['header']}>
          <div className={Styles['title']}>
            Upload compnay Logo.
          </div>
        </div>
        <div className={Styles['main']}>
          <div className={Styles['items']}>
            {(() => {
              const itemClasses = [Styles['item']];
              itemClasses.push(Styles['size--full']);
              return (
                <div className={itemClasses.join(' ')}>
                  <div className={Styles['image']}>
                    <div className={Styles['holder']}>
                      <div className={Styles['icon']}>
                        <div className={Styles['button']}>
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <FontAwesomeIcon icon={faImages} />
                      </div>
                    </div>
                    <div className={Styles['description']}>
                      Only images with a size lower than 500 KB are allowed.
                    </div>
                  </div>
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
              Submit
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogoForm;