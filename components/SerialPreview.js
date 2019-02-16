import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/serial-preview.scss';

const SerialPreview = ({
  slug, title, cover, theme,
}) => (
  <Link href={`/serial?slug=${slug}`} as={`/serials/${slug}`}>
    <a className={`${styles.wrapper} ${styles[theme]}`}>
      <div className={styles.cover} style={{ backgroundImage: `url("${cover}")` }} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h2>{title}</h2>
        </div>
      </div>
    </a>
  </Link>
);

SerialPreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  theme: PropTypes.string,
};

SerialPreview.defaultProps = {
  cover: '',
  theme: 'default',
};

export default SerialPreview;
