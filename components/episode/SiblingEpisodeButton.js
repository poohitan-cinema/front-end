import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Button from '../ui/Button';

const LABELS = {
  previous: 'Попередня серія',
  next: 'Наступна серія',
};

const SiblingEpisodeButton = ({
  episodeNumber, seasonNumber, serialSlug, type, theme,
}) => {
  const label = LABELS[type];

  if (!(episodeNumber && seasonNumber && serialSlug)) {
    return <Button light disabled>{label}</Button>;
  }

  return (
    <Link
      href={`/episode?number=${episodeNumber}&serialSlug=${serialSlug}&seasonNumber=${seasonNumber}`}
      as={`/serials/${serialSlug}/seasons/${seasonNumber}/episodes/${episodeNumber}`}
      prefetch
    >
      <a><Button light theme={theme}>{label}</Button></a>
    </Link>
  );
};

SiblingEpisodeButton.propTypes = {
  episodeNumber: PropTypes.string,
  seasonNumber: PropTypes.number,
  serialSlug: PropTypes.string,
  type: PropTypes.oneOf(['previous', 'next']).isRequired,
  theme: PropTypes.string,
};

SiblingEpisodeButton.defaultProps = {
  episodeNumber: null,
  seasonNumber: null,
  serialSlug: null,
  theme: '',
};

export default SiblingEpisodeButton;
