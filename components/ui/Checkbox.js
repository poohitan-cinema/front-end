import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/ui/checkbox.scss';

const Checkbox = ({
  label,
  checked,
  theme,
  disabled,
  name,
  onChange,
  className,
}) => {
  const classList = [className, styles.wrapper, styles[theme]];

  if (checked) {
    classList.push(styles.checked);
  }

  return (
    <div className={classList.join(' ')}>
      <div className={styles.checkbox} />
      <div className={styles.label} onClick={onChange}>{label}</div>
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={event => console.log(event)}
        className={styles.nativeCheckbox}
      />
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  name: '',
  disabled: false,
  theme: '',
  onChange: () => {},
  className: '',
};

export default Checkbox;
