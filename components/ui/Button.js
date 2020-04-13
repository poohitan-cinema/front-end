import React from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/ui/button.module.scss';

const Button = ({
  text,
  children,
  theme,
  icon,
  disabled,
  active,
  light,
  onClick,
  className,
}) => {
  const classList = [className, styles.button, styles[theme]];

  if (disabled) {
    classList.push(styles.disabled);
  }

  if (active) {
    classList.push(styles.active);
  }

  if (light) {
    classList.push(styles.light);
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
      <div className={styles.content}>
        {
          text || children
        }
      </div>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node,
  theme: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  light: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  theme: '',
  icon: '',
  children: null,
  disabled: false,
  active: false,
  light: false,
  onClick: () => {},
  className: '',
};

export default Button;
