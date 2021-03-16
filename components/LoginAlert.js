import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/login-alert.module.scss';
import Button from './ui/Button';

const Alert = ({ message, visible, onClose }) => (
  <div
    className={styles.popUpWrapper}
    style={{ display: (visible ? 'block' : 'none') }}
  >
    <div className={styles.popUp}>
      <div>{message}</div>
      <Button onClick={onClose}>Ok</Button>
    </div>
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert;
