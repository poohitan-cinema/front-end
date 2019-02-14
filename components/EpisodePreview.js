import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/episode-preview.scss';

const EpisodePreview = ({
  id, title, serialId, seasonId, colorScheme,
}) => (
  <Link
    href={`/episode?id=${id}&serialId=${serialId}&seasonId=${seasonId}`}
    as={`/serials/${serialId}/seasons/${seasonId}/episodes/${id}`}
  >
    <a className={`${styles.wrapper} ${styles[colorScheme]}`}>
      <h2>{`Серія ${id}`}</h2>
      {
        title && <div className={styles.title}>{title}</div>
      }
    </a>
  </Link>
);

EpisodePreview.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  serialId: PropTypes.string.isRequired,
  seasonId: PropTypes.number.isRequired,
  colorScheme: PropTypes.string,
};

EpisodePreview.defaultProps = {
  title: '',
  colorScheme: '',
};

export default EpisodePreview;
