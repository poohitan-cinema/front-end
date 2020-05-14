import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import FireLight from './ui/FireLight';

import styles from '../styles/components/menu.module.scss';

const Menu = ({ freshUploadsAvailable }) => {
  const menuItems = [
    {
      href: '/last-uploads',
      title: 'Останні завантаження',
      highlighted: freshUploadsAvailable,
    },
    {
      href: '/stats',
      title: 'Статистика',
    },
    {
      href: '/donate',
      hover: 'Закинути на «Живчик»',
      icon: (
        <div className={styles.icon}>
          <img alt="" src="/static/zhyvchyk.png" />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      {
        menuItems
          .map(item => (
            <Link href={item.href} as={item.as} key={item.title}>
              <a
                href={item.href}
                title={item.hover || item.title}
                className={`${styles.item} ${item.icon ? styles.itemWithIcon : ''}`}
              >
                {
                  item.icon
                }
                <span className={styles.itemTitle}>{item.title}</span>
                {
                  item.highlighted
                    ? <FireLight title="Є шось нове" className={styles.itemHighlight} />
                    : null
                }
              </a>

            </Link>
          ))
      }
    </div>
  );
};

Menu.propTypes = {
  freshUploadsAvailable: PropTypes.bool,
};

Menu.defaultProps = {
  freshUploadsAvailable: false,
};

export default Menu;
