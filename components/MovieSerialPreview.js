import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/movie-serial-preview.scss';

const MovieSerialPreview = ({
  slug, title, cover, theme, type,
}) => (
  <Link href={`/${type}?slug=${slug}`} as={`/${type}s/${slug}`} prefetch>
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

MovieSerialPreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['movie', 'serial']).isRequired,
};

MovieSerialPreview.defaultProps = {
  cover: '',
  theme: '',
};

export default MovieSerialPreview;
