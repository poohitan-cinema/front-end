import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import dashToCamel from '../../helpers/dash-to-camel';
import styles from '../../styles/components/breadcrumbs.module.scss';

const Breadcrumb = ({
  title, icon, href, as, theme, disabled,
}) => (
  <h1 className={`${styles.crumb} ${disabled && styles.disabled}`}>
    {
      icon && <div className={styles.icon} style={{ backgroundImage: `url("${icon}")` }} />
    }
    <Link href={href} as={as}>
      <a className={`${styles.link} ${styles[dashToCamel(theme)]}`}>{title}</a>
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
