import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import dashToCamel from '../helpers/dash-to-camel';
import styles from '../styles/components/episode-preview.module.scss';

const EpisodePreview = ({
  number, title, serialSlug, seasonNumber, theme,
}) => (
  <Link
    href={`/episode?number=${number}&serialSlug=${serialSlug}&seasonNumber=${seasonNumber}`}
    as={`/serials/${serialSlug}/seasons/${seasonNumber}/episodes/${number}`}
  >
    <a className={`${styles.wrapper} ${styles[dashToCamel(theme)]}`}>
      <h2 className={styles.number}>{`Серія ${number}`}</h2>
      {
        title && <div className={styles.title}>{title}</div>
      }
    </a>
  </Link>
);

EpisodePreview.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string,
  serialSlug: PropTypes.string.isRequired,
  seasonNumber: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

EpisodePreview.defaultProps = {
  title: '',
  theme: '',
};

export default EpisodePreview;
