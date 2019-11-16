import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { initGA, logPageView } from '../services/analytics';
import Logo from './ui/Logo';
import FireLight from './ui/FireLight';

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
    const { children, freshUploads } = this.props;

    // TODO: create a separate component for menu
    const menuItems = [
      {
        href: '/last-uploads',
        title: 'Останні завантаження',
        highlighted: freshUploads,
      },
      {
        href: '/stats',
        title: 'Статистика',
      },
      {
        href: '/preferences',
        title: 'Налаштування',
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
                      <a className={styles.menuItem}>
                        <span>{item.title}</span>
                        {
                          item.highlighted
                            ? <FireLight title="Є шось нове" className={styles.menuItemHighlight} />
                            : null
                        }
                      </a>

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
  freshUploads: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  freshUploads: false,
};

export default Layout;
