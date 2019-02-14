import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/Player';

import Data from '../services/data';

import styles from '../styles/pages/episode.scss';

const EpisodePage = ({
  id,
  title,
  source,
  serial,
  season,
}) => {
  const breadcrumbs = [
    {
      icon: serial.icon,
      title: serial.title,
      href: `/serial?id=${serial.id}`,
      as: `/serials/${serial.id}`,
    },
    {
      title: `Сезон ${season.id}`,
      href: `/season?id=${season.id}&serialId=${serial.id}`,
      as: `/serials/${serial.id}/seasons/${season.id}`,
    },
    {
      title: `Серія ${id}`,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.id} />
      <div className={styles.wrapper}>
        {
          title && <h2 className={styles.title}>{title}</h2>
        }
        <div className={styles.player} >
          <Player source={source} />
        </div>
      </div>
    </Layout>
  );
};

EpisodePage.getInitialProps = ({ query }) => {
  const { serialId, seasonId, id } = query;
  const episode = Data.getEpisode({ id, serialId, seasonId });

  return episode;
};

EpisodePage.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  source: PropTypes.string.isRequired,
  serial: PropTypes.shape({
    id: PropTypes.string,
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
