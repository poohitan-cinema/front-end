import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/season-preview.scss';

const SeasonPreview = ({
  number, cover, serialSlug, theme,
}) => (
  <Link
    href={`/season?number=${number}&serialSlug=${serialSlug}`}
    as={`/serials/${serialSlug}/seasons/${number}`}
    prefetch
  >
    <a className={`${styles.wrapper} ${styles[theme]}`} style={{ backgroundImage: `url("${cover}")` }}>
      <div className={styles.content}>
        <h2>{`Сезон ${number}`}</h2>
      </div>
    </a>
  </Link>
);

SeasonPreview.propTypes = {
  number: PropTypes.string.isRequired,
  cover: PropTypes.string,
  serialSlug: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

SeasonPreview.defaultProps = {
  cover: '',
  theme: '',
};

export default SeasonPreview;
