import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import dashToCamel from '../helpers/dash-to-camel';
import styles from '../styles/components/movie-serial-preview.module.scss';

const MovieSerialPreview = ({
  slug, title, cover, theme, type,
}) => (
  <Link href={`/${type}?slug=${slug}`} as={`/${type}s/${slug}`}>
    <a className={`${styles.wrapper} ${styles[dashToCamel(theme)]}`}>
      <div className={styles.cover} style={{ backgroundImage: `url("${cover}")` }} />
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h3>{title}</h3>
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
