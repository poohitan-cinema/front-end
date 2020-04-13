import React from 'react';
import Link from 'next/link';

import styles from '../../styles/components/ui/logo.module.scss';

const Logo = () => (
  <Link href="/index" as="/">
    <a className={styles.logo}>
      <i className="fas fa-film" />
      <div className={styles.title}>На головну</div>
    </a>
  </Link>
);

export default Logo;
