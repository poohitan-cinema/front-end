import React from 'react';
import PropTypes from 'prop-types';

import { initGA, logPageView } from '../services/analytics';
import Logo from './ui/Logo';
import Menu from './Menu';

import styles from '../styles/components/layout.module.scss';

class Layout extends React.Component {
  componentDidMount() {
    if (!global.GA_INITIALIZED) {
      initGA();
      global.GA_INITIALIZED = true;
    }

    logPageView();
  }

  render() {
    const { children, freshUploads } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <Logo />
            <Menu freshUploadsAvailable={freshUploads} />
          </div>

          { children }
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  freshUploads: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  freshUploads: false,
};

export default Layout;
