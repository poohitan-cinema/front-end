import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/serial-preview.scss';

const SerialPreview = ({ id, title, cover }) => (
  <Link href={`/serial?id=${id}`} as={`/serials/${id}`}>
    <a className={`${styles.wrapper} ${styles[id]}`}>
      <div className={styles.coverContainer}>
        <div className={styles.cover} style={{ backgroundImage: `url("${cover}")` }} />
      </div>
      <div className={styles.content}>
        <h2>{title}</h2>
      </div>
    </a>
  </Link>
);

SerialPreview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
};

SerialPreview.defaultProps = {
  cover: '',
};

export default SerialPreview;
