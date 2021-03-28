import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/alert.module.scss';
import Button from './ui/Button';

const Alert = ({
  message, visible, buttonText, onClose,
}) => {
  const classList = [styles.alertWrapper];

  if (visible) {
    classList.push(styles.show);
  }

  return (
    <div className={classList.join(' ')}>
      <div className={styles.alert}>
        <div className={styles.alertHeader}>
          <Button className={styles.closeButton} onClick={onClose}>+</Button>
        </div>
        <div className={styles.alertMessage}>{message}</div>
        <div className={styles.alertFooter}>
          <Button onClick={onClose}>{buttonText}</Button>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  buttonText: 'OK',
};

export default Alert;
