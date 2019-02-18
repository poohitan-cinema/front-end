import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/Player';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

const EpisodePage = ({
  number,
  title,
  source,
  serial,
  season,
}) => {
  const breadcrumbs = [
    {
      icon: serial.icon,
      title: serial.title,
      href: `/serial?slug=${serial.slug}`,
      as: `/serials/${serial.slug}`,
    },
    {
      title: `Сезон ${season.number}`,
      href: `/season?number=${season.number}&serialSlug=${serial.slug}`,
      as: `/serials/${serial.slug}/seasons/${season.number}`,
    },
    {
      title: `Серія ${number}`,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
      <div className={styles.wrapper}>
        {
          title && <h2 className={styles.title}>{title}</h2>
        }
        <div className={styles.playerWrapper}>
          <Player source={source} theme={serial.slug} className={styles.player} />
        </div>
      </div>
    </Layout>
  );
};

EpisodePage.getInitialProps = async ({ query }) => {
  const { serialSlug, seasonNumber, number } = query;

  const [serial] = await API.getSerials({ slug: serialSlug });
  const [season] = await API.getSeasons({ serialId: serial.id, number: seasonNumber });
  const [{ url: source, ...rest }] = await API.getEpisodes({ number, seasonId: season.id });

  return {
    source,
    ...rest,
    serial,
    season,
  };
};

EpisodePage.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string,
  source: PropTypes.string.isRequired,
  serial: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  season: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

EpisodePage.defaultProps = {
  title: '',
};

export default EpisodePage;
