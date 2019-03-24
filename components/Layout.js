import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

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

    // TODO: create a separate component for menu
    const menuItems = [
      {
        href: '/updates',
        title: 'Останні завантаження',
      },
      {
        href: '/stats',
        title: 'Статистика',
      },
    ];

    return (
      <div className={styles.wrapper}>
        <div className={styles.layout}>
          <div className={styles.header}>
            <Logo />
            <div className={styles.menu}>
              {
                menuItems
                  .map(item => (
                    <Link href={item.href} as={item.as} key={item.title}>
                      <a className={styles.menuItem}>{item.title}</a>
                    </Link>
                  ))
              }
            </div>
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
