import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import config from '../config';

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

  const viewableEpisodes = episodes.filter(episode => episode.url);

  return (
    <Layout>
      <Head><title>{`${serial.title} – Cезон ${number} / ${config.pageTitle}`}</title></Head>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
      <div className={styles.grid}>
        {
          viewableEpisodes.length
            ? viewableEpisodes.map(episode => (
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

SeasonPage.getInitialProps = async ({ req, res, query }) => {
  const { serialSlug, number } = query;
  const cookies = parseCookies({ req });

  try {
    const season = await API.seasons.getOne({ number, serialSlug }, { cookies });

    return season;
  } catch (error) {
    console.error(error);

    return global.window ? Router.replace('/login') : res.redirect('/login');
  }
};

SeasonPage.propTypes = {
  number: PropTypes.string.isRequired,
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
