import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import EpisodePreview from '../components/EpisodePreview';

import API from '../services/api';

import styles from '../styles/pages/season.scss';

const SeasonPage = ({
  number,
  episodes,
  serial,
}) => {
  const breadcrumbs = [
    {
      icon: serial.icon,
      title: serial.title,
      href: `/serial?slug=${serial.slug}`,
      as: `/serials/${serial.slug}`,
    },
    {
      title: `Сезон ${number}`,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
      <div className={styles.grid}>
        {
          episodes.length
            ? episodes.map(episode => (
              <EpisodePreview
                {...episode}
                serialSlug={serial.slug}
                seasonNumber={number}
                key={episode.id}
                theme={serial.slug}
              />
            ))
            : 'Нема серій'
        }
      </div>
    </Layout>
  );
};

SeasonPage.getInitialProps = async ({ query }) => {
  const { serialSlug, number } = query;

  const [serial] = await API.getSerials({ slug: serialSlug });
  const [season] = await API.getSeasons({ serialId: serial.id, number });
  const episodes = await API.getEpisodes({ seasonId: season.id });

  return { ...season, serial, episodes };
};

SeasonPage.propTypes = {
  number: PropTypes.number.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object),
  serial: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

SeasonPage.defaultProps = {
  episodes: [],
};

export default SeasonPage;
