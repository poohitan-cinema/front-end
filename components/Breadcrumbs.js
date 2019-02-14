import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/breadcrumbs.scss';

const Separator = () => <div className={styles.separator}>*</div>;

const Crumb = ({
  title, icon, href, as, colorScheme, disabled,
}) => (
  <div className={`${styles.crumb} ${disabled && styles.disabled}`}>
    {
      icon && <div className={styles.icon} style={{ backgroundImage: `url("${icon}")` }} />
    }
    <Link href={href} as={as}>
      <a className={`${styles.link} ${styles[colorScheme]}`}><h1>{title}</h1></a>
    </Link>
  </div>
);

const Breadcrumbs = ({ crumbs, colorScheme }) => (
  <div className={styles.wrapper}>
    {
      crumbs
        .map((crumb, index) => (
          <Crumb
            {...crumb}
            key={crumb.title}
            colorScheme={colorScheme}
            disabled={index === crumbs.length - 1}
          />
        ))
        .reduce((previous, current) => [previous, <Separator key={`${previous.title}*`} />, current])
    }
  </div>
);

Crumb.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  href: PropTypes.string,
  as: PropTypes.string,
  colorScheme: PropTypes.string,
  disabled: PropTypes.bool,
};

Crumb.defaultProps = {
  icon: '',
  href: '',
  as: '',
  colorScheme: '',
  disabled: false,
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.object),
  colorScheme: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  crumbs: [],
  colorScheme: '',
};

export default Breadcrumbs;
