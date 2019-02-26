import React from 'react';
import PropTypes from 'prop-types';

import { initGA, logPageView } from '../services/analytics';
import Logo from './ui/Logo';

import styles from '../styles/components/layout.scss';

class Layout extends React.Component {
  componentDidMount() {
    if (!global.GA_INITIALIZED) {
      initGA();
      global.GA_INITIALIZED = true;
    }

    logPageView();
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <div className={styles.logoWrapper}>
            <Logo />
          </div>

          { children }
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
