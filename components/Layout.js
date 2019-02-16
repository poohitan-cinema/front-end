import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';

import styles from '../styles/components/layout.scss';

const Layout = ({ children }) => (
  <div className={styles.wrapper}>
    <div className={styles.layout}>
      <div className={styles.logoWrapper}>
        <Logo />
      </div>

      {
        children
      }
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
