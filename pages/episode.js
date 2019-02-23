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
  number,
  title,
  url,
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
      title: `Серія ${number}`,
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
        href={`/episode?number=${nextEpisode.number}&serialSlug=${serial.slug}&seasonNumber=${season.number}`}
        as={`/serials/${serial.slug}/seasons/${season.number}/episodes/${nextEpisode.number}`}
        prefetch
      >
        <a><Button light theme={serial.slug}>Наступна серія</Button></a>
      </Link>
    )
    : <div />;

  return (
    <Layout>
      <Head>
        <title>{`${serial.title} – Cезон ${season.number}, Cерія ${number} / ${config.pageTitle}`}</title>
      </Head>
      <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
      <div className={`${styles.wrapper} ${styles[serial.slug]}`}>
        {
          title && <h2 className={styles.title}>{title}</h2>
        }
        <div className={styles.playerWrapper}>
          {
            url ? <Player source={url} theme={serial.slug} className={styles.player} /> : 'Цієї серії ше немає'
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
    const episode = await API.getEpisode({ number, seasonNumber, serialSlug }, { cookies });

    return episode;
  } catch (error) {
    console.error(error);
    destroyCookie({ req }, 'token');

    return global.window ? Router.replace('/login') : res.redirect('/login');
  }
};

EpisodePage.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string,
  url: PropTypes.string.isRequired,
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
  title: '',
  previousEpisode: null,
  nextEpisode: null,
};

export default EpisodePage;
