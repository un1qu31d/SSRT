import React, {Component} from 'react';
import Styles from './index.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faBuilding, faImages, faCheckCircle} from '@fortawesome/free-regular-svg-icons';

class Steps extends Component {
  static defaultProps = {
    steps: [
      {id: 'account', icon: <FontAwesomeIcon icon={faUser} />},
      {id: 'company', icon: <FontAwesomeIcon icon={faBuilding} />},
      {id: 'logo', icon: <FontAwesomeIcon icon={faImages} />},
      {id: 'confirmation', icon: <FontAwesomeIcon icon={faCheckCircle} />}
    ],
    currentStep: 1
  }
  render() {
    const {steps, currentStep} = this.props;
    const classes = [];
    classes.push(Styles['steps']);
    return (
      <div className={classes.join()}>
        <div className={Styles['bar']}>
          <div className={Styles['progress']} style={{width: `${(((currentStep > 1 ? (currentStep < steps.length ? currentStep : steps.length) : 1) - 1) / (steps.length - 1) * 100)}%`}}></div>
        </div>
        {steps.map((_step, _stepIndex) => {
          const stepCalsses = [];
          stepCalsses.push(Styles['step']);
          if ((_stepIndex + 1) < currentStep) stepCalsses.push(Styles['status--completed']);
          if ((_stepIndex + 1) === currentStep) stepCalsses.push(Styles['status--current']);
          return (
            <div key={_step['id']} className={stepCalsses.join(' ')}>
              {_step['icon']}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Steps;