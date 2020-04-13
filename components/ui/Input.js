import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/ui/input.module.scss';

const Input = ({
  placeholder, value, icon, type, disabled, onChange, className,
}) => {
  const wrapperClassList = [styles.wrapper, className];

  if (disabled) {
    wrapperClassList.push(styles.disabled);
  }

  const inputClassList = [styles.input];

  if (icon) {
    inputClassList.push(styles.withIcon);
  }

  return (
    <div className={wrapperClassList.join(' ')}>
      {
        icon && <div className={styles.icon}><i className={icon} /></div>
      }
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        onChange={event => onChange(event.target.value)}
        className={inputClassList.join(' ')}
      />
    </div>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  value: '',
  icon: '',
  type: 'text',
  disabled: false,
  className: '',
};

export default Input;
