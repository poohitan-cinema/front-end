import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/button.scss';

const Button = ({
  text,
  children,
  theme,
  icon,
  disabled,
  onClick,
}) => {
  const classList = [styles.button, styles[theme]];

  if (disabled) {
    classList.push(styles.disabled);
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={classList.join(' ')}
    >
      {
        icon && <div className={styles.icon}><i className={icon} /></div>
      }
      {
        text || children
      }
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  text: '',
  theme: '',
  icon: '',
  children: null,
  disabled: false,
};

export default Button;
