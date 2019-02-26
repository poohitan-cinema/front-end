import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../../styles/components/breadcrumbs.scss';

const Breadcrumb = ({
  title, icon, href, as, theme, disabled,
}) => (
  <h1 className={`${styles.crumb} ${disabled && styles.disabled}`}>
    {
      icon && <div className={styles.icon} style={{ backgroundImage: `url("${icon}")` }} />
    }
    <Link href={href} as={as} prefetch>
      <a className={`${styles.link} ${styles[theme]}`}>{title}</a>
    </Link>
  </h1>
);

Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
  theme: PropTypes.string,
  disabled: PropTypes.bool,
};

Breadcrumb.defaultProps = {
  icon: '',
  href: '',
  as: '',
  theme: '',
  disabled: false,
};

export default Breadcrumb;
