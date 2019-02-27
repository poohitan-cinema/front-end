import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies, destroyCookie } from 'nookies';

import config from '../config';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/ui/Player';

import NextEpisodeButton from '../components/episode/NextEpisodeButton';
import PreviousEpisodeButton from '../components/episode/PreviousEpisodeButton';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

class EpisodePage extends React.Component {
  static async getInitialProps({ req, res, query }) {
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
  }

  render() {
    const {
      number,
      title,
      description,
      url,
      previousEpisode,
      nextEpisode,
      serial,
      season,
    } = this.props;

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
            <PreviousEpisodeButton
              episodeNumber={previousEpisode.number}
              seasonNumber={season.number}
              serialSlug={serial.slug}
              theme={serial.slug}
            />
            <RandomEpisodeButton theme={serial.slug} serialId={serial.id} />
            <NextEpisodeButton
              episodeNumber={nextEpisode.number}
              seasonNumber={season.number}
              serialSlug={serial.slug}
              theme={serial.slug}
            />
          </div>
          {
            description && <div className={styles.description}>{description}</div>
          }
        </div>
      </Layout>
    );
  }
}

EpisodePage.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
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
  description: '',
  previousEpisode: {
    number: null,
  },
  nextEpisode: {
    number: null,
  },
};

export default EpisodePage;
