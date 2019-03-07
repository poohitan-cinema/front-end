import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styles from '../styles/components/last-viewed-thing.scss';

const REWIND_SECONDS = 5;

const shortenTitle = (string = '', length = 40) => (string.length > length + 1 ? `${string.slice(0, length)}...` : string);

const getEpisodeCaption = ({
  number = '?', seasonNumber = '?', title, showSerialTitle, serialTitle,
}) => {
  let lastEpisodeCaption = `${seasonNumber}&times;${number}`;

  if (title) {
    lastEpisodeCaption = `«${shortenTitle(title)}» (${lastEpisodeCaption})`;
  }

  if (showSerialTitle) {
    lastEpisodeCaption = `${serialTitle}, ${lastEpisodeCaption}`;
  }

  return lastEpisodeCaption;
};

const LastViewedThing = ({
  episodeTitle,
  episodeNumber,
  seasonNumber,
  serialSlug,
  serialTitle,
  movieTitle,
  movieSlug,
  showSerialTitle,
  nextEpisode,
  endTime,
  className,
}) => {
  const startAt = endTime - REWIND_SECONDS;

  if (movieSlug) {
    return (
      <div className={styles.wrapper}>
        <span>Останній перегляд:&nbsp;</span>
        <Link
          href={`/movie?slug=${movieSlug}&time=${startAt}`}
          as={`/movies/${movieSlug}?time=${startAt}`}
          prefetch
        >
          <a className={styles.link}>{shortenTitle(movieTitle)}</a>
        </Link>
      </div>
    );
  }

  const lastEpisodeCaption = getEpisodeCaption({
    number: episodeNumber, title: episodeTitle, seasonNumber, showSerialTitle, serialTitle,
  });

  const nextEpisodeCaption = nextEpisode ? getEpisodeCaption({ ...nextEpisode }) : '';

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.row}>
        <span>Останній перегляд:&nbsp;</span>
        <Link
          prefetch
          href={`/episode?number=${episodeNumber}&serialSlug=${serialSlug}&seasonNumber=${seasonNumber}&time=${startAt}`}
          as={`/serials/${serialSlug}/seasons/${seasonNumber}/episodes/${episodeNumber}?time=${startAt}`}
        >
          <a className={styles.link} dangerouslySetInnerHTML={{ __html: lastEpisodeCaption }} />
        </Link>
      </div>
      {
        nextEpisode
        && (
          <div className={styles.row}>
            <span>Наступна серія:&nbsp;</span>
            <Link
              href={`/episode?number=${nextEpisode.number}&serialSlug=${serialSlug}&seasonNumber=${nextEpisode.seasonNumber}`}
              as={`/serials/${serialSlug}/seasons/${nextEpisode.seasonNumber}/episodes/${nextEpisode.number}`}
              prefetch
            >
              <a className={styles.link} dangerouslySetInnerHTML={{ __html: nextEpisodeCaption }} />
            </Link>
          </div>
        )
      }
    </div>
  );
};

LastViewedThing.propTypes = {
  episodeTitle: PropTypes.string,
  episodeNumber: PropTypes.string,
  seasonNumber: PropTypes.string,
  serialSlug: PropTypes.string,
  serialTitle: PropTypes.string,
  movieTitle: PropTypes.string,
  movieSlug: PropTypes.string,
  showSerialTitle: PropTypes.bool,
  nextEpisode: PropTypes.shape({
    number: PropTypes.string,
    title: PropTypes.string,
    seasonNumber: PropTypes.string,
  }),
  endTime: PropTypes.number.isRequired,
  className: PropTypes.string,
};

LastViewedThing.defaultProps = {
  episodeTitle: '',
  episodeNumber: '',
  seasonNumber: '',
  serialSlug: '',
  serialTitle: '',
  movieTitle: '',
  movieSlug: '',
  showSerialTitle: false,
  nextEpisode: null,
  className: '',
};

export default LastViewedThing;
