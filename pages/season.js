import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import EpisodePreview from '../components/EpisodePreview';

import Data from '../services/data';

import styles from '../styles/pages/season.scss';

const SeasonPage = ({
  id,
  episodes,
  serial,
}) => {
  const breadcrumbs = [
    {
      icon: serial.icon,
      title: serial.title,
      href: `/serial?id=${serial.id}`,
      as: `/serials/${serial.id}`,
    },
    {
      title: `Сезон ${id}`,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.id} />
      <div className={styles.grid}>
        {
          episodes.map(episode => (
            <EpisodePreview {...episode} serialId={serial.id} seasonId={id} key={episode.id} theme={serial.id} />
          ))
        }
      </div>
    </Layout>
  );
};

SeasonPage.getInitialProps = ({ query }) => {
  const { serialId, id } = query;
  const season = Data.getSeason({ id, serialId });

  return season;
};

SeasonPage.propTypes = {
  id: PropTypes.number.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object),
  serial: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

SeasonPage.defaultProps = {
  episodes: [],
};

export default SeasonPage;
