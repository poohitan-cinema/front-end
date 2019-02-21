import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies, destroyCookie } from 'nookies';

import config from '../config';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/Player';
import Button from '../components/Button';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

const EpisodePage = ({
  episode,
  previousEpisode,
  nextEpisode,
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
      title: `Серія ${episode.number}`,
    },
  ];

  const previousEpisodeLink = previousEpisode
    ? (
      <Link
        href={`/episode?number=${previousEpisode.number}&serialSlug=${serial.slug}&seasonNumber=${season.number}`}
        as={`/serials/${serial.slug}/seasons/${season.number}/episodes/${previousEpisode.number}`}
        prefetch
      >
        <a><Button light theme={serial.slug}>Попередня серія</Button></a>
      </Link>
    )
    : <div />;

  const nextEpisodeLink = nextEpisode
    ? (
      <Link
        href={`/episode?number=${nextEpisode.number}&serial.slug=${serial.slug}&seasonNumber=${season.number}`}
        as={`/serials/${serial.slug}/seasons/${season.number}/episodes/${nextEpisode.number}`}
        prefetch
      >
        <a><Button light theme={serial.slug}>Наступна серія</Button></a>
      </Link>
    )
    : <div />;

  return (
    <Layout>
      <Head><title>{`${serial.title} – Cезон ${season.number}, Cерія ${episode.number} / ${config.pageTitle}`}</title></Head>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
      <div className={`${styles.wrapper} ${styles[serial.slug]}`}>
        {
          episode.title && <h2 className={styles.title}>{episode.title}</h2>
        }
        <div className={styles.playerWrapper}>
          {
            episode.url ? <Player source={episode.url} theme={serial.slug} className={styles.player} /> : 'Цієї серії ше немає'
          }
        </div>
        <div className={styles.footer}>
          { previousEpisodeLink }
          { nextEpisodeLink }
        </div>
      </div>
    </Layout>
  );
};

EpisodePage.getInitialProps = async ({ req, res, query }) => {
  const { serialSlug, seasonNumber, number } = query;
  const cookies = parseCookies({ req });

  try {
    const [serial] = await API.getSerials({ slug: serialSlug }, { cookies });
    const [season] = await API.getSeasons({ serialId: serial.id, number: seasonNumber }, { cookies });
    const [episode] = await API.getEpisodes({ number, seasonId: season.id }, { cookies });
    const [previousEpisode] = await API.getEpisodes({ number: Number(number) - 1, seasonId: season.id }, { cookies });
    const [nextEpisode] = await API.getEpisodes({ number: Number(number) + 1, seasonId: season.id }, { cookies });

    return {
      episode,
      previousEpisode,
      nextEpisode,
      serial,
      season,
    };
  } catch (error) {
    console.error(error);
    destroyCookie({ req }, 'token');

    return global.window ? Router.replace('/login') : res.redirect('/login');
  }
};

EpisodePage.propTypes = {
  episode: PropTypes.shape({
    number: PropTypes.number.isRequired,
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
  previousEpisode: PropTypes.shape({
    number: PropTypes.number,
  }),
  nextEpisode: PropTypes.shape({
    number: PropTypes.number,
  }),
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
  previousEpisode: null,
  nextEpisode: null,
};

export default EpisodePage;
