import React, {Component} from 'react';
import Styles from './index.module.scss';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState(_state => ({
      ..._state,
      submitting: true
    }));
  }

  render() {
    const {submitting} = this.state;
    const classes = [];
    classes.push(Styles['form']);
    return (
      <div className={classes.join()}>
        <div className={Styles['header']}>
          <div className={Styles['title']}>
            Tell us more about you.
          </div>
        </div>
        <div className={Styles['main']}>
          <div className={Styles['items']}>
            <div className={`${Styles['item']} ${Styles['size--full']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  FULL NAME
                </div>
                <div className={Styles['input']}>
                  <input
                    type="text"
                    placeholder="Enter Your full name"
                  />
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Enter your full name
              </div>
              )}
            </div>
            <div className={`${Styles['item']} ${Styles['size--full']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  BUSINESS EMAIL
                </div>
                <div className={Styles['input']}>
                  <input
                    type="text"
                    placeholder="Enter Your business email"
                  />
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Enter your business email
              </div>
              )}
            </div>
            <div className={`${Styles['item']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  COUNTRY
                </div>
                <div className={Styles['input']}>
                  <select
                    defaultValue=""
                    className={Styles['status--empty']}
                  >
                    <option value="" hidden>Select Your country</option>
                    <option value="egypt">Egypt</option>
                  </select>
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Select your country
              </div>
              )}
            </div>
            <div className={`${Styles['item']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  PHONE NUMBER
                </div>
                <div className={Styles['input']}>
                  <input
                    type="text"
                    placeholder="Enter Your phone number"
                  />
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Enter your phone number
              </div>
              )}
            </div>
            <div className={`${Styles['item']} ${Styles['size--full']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  PASSWORD
                </div>
                <div className={Styles['input']}>
                  <input
                    type="text"
                    placeholder="Enter Your password"
                  />
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Enter your password
              </div>
              )}
            </div>
            <div className={`${Styles['item']} ${Styles['size--full']} ${submitting ? Styles['theme--error'] : ''}`}>
              <div className={Styles['field']}>
                <div className={Styles['label']}>
                  REPEAT PASSWORD
                </div>
                <div className={Styles['input']}>
                  <input
                    type="text"
                    placeholder="Enter Your password again"
                  />
                </div>
              </div>
              {submitting && (
              <div className={Styles['note']}>
                Please Enter your password again
              </div>
              )}
            </div>
          </div>
        </div>
        <div className={Styles['footer']}>
          <div className={Styles['links']}>
            <div className={Styles['link']}>
              <a href="">Back to login</a>
            </div>
          </div>
          <div className={Styles['options']}>
            <div className={`${Styles['option']} ${Styles['type--primary']}`} onClick={this.handleSubmit}>
              Next
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AccountForm;