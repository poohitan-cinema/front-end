import React from 'react';
import Link from 'next/link';

import styles from '../../styles/components/ui/logo.scss';

const Logo = () => (
  <Link href="/index" as="/" prefetch>
    <a className={styles.logo}>
      <i className="fas fa-film" />
      <div className={styles.title}>На головну</div>
    </a>
  </Link>
);

export default Logo;
