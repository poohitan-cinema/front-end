import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/season-preview.scss';

const SeasonPreview = ({ id, cover, serialId }) => (
  <Link href={`/season?id=${id}&serialId=${serialId}`} as={`/serials/${serialId}/${id}`}>
    <a>
      <div className={`${styles.wrapper} ${styles[serialId]}`} style={{ backgroundImage: `url("${cover}")` }}>
        <div className={styles.content}>
          <h2>{`Сезон ${id}`}</h2>
        </div>
      </div>
    </a>
  </Link>
);

SeasonPreview.propTypes = {
  id: PropTypes.number.isRequired,
  cover: PropTypes.string,
  serialId: PropTypes.string.isRequired,
};

SeasonPreview.defaultProps = {
  cover: '',
};

export default SeasonPreview;
