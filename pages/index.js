import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import withSession from '../hocs/withSession';
import withLastUploads from '../hocs/withLastUploads';
import config from '../config';

import Layout from '../components/Layout';
import MovieSerialPreview from '../components/MovieSerialPreview';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';
import RandomMovieButton from '../components/movie/RandomMovieButton';
import LastViewedThing from '../components/LastViewedThing';

import API from '../services/api';

import styles from '../styles/pages/index.module.scss';

class IndexPage extends React.Component {
  static async getInitialProps({ req, res }) {
    const cookies = parseCookies({ req });

    try {
      const serials = await API.serials.getMany({}, { cookies });
      const movies = await API.movies.getMany({}, { cookies });
      const lastEpisodeView = await API.videoViews.getForLastEpisode({}, { cookies });
      const lastMovieView = await API.videoViews.getForLastMovie({}, { cookies });

      return {
        serials,
        movies,
        lastEpisodeView,
        lastMovieView,
      };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const {
      serials,
      movies,
      lastEpisodeView,
      lastMovieView,
      lastUploads,
    } = this.props;

    return (
      <Layout freshUploads={lastUploads.fresh}>
        <Head>
          <title>{config.pageTitle}</title>
        </Head>
        <div className={styles.section}>
          <div className={styles.header}>
            <h1>Серіали</h1>
            <div className={`${styles.navigation} ${lastEpisodeView ? styles.fullWidth : ''}`}>
              {
                lastEpisodeView && <LastViewedThing {...lastEpisodeView} showSerialTitle className={styles.lastView} />
              }
              {
                serials.length
                  ? <RandomEpisodeButton className={styles.totallyRandomButton} />
                  : null
              }
            </div>
          </div>

          <div className={styles.grid}>
            {
              serials.length
                ? serials.map(serial => <MovieSerialPreview type="serial" {...serial} theme={serial.slug} key={serial.id} />)
                : 'Нема серіалів'
            }
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.header}>
            <h1>Фільми</h1>
            <div className={`${styles.navigation} ${lastMovieView ? styles.fullWidth : ''}`}>
              {
                lastMovieView && <LastViewedThing {...lastMovieView} className={styles.lastView} />
              }
              {
                movies.length
                  ? <RandomMovieButton className={styles.totallyRandomButton} />
                  : null
              }
            </div>
          </div>
          <div className={styles.grid}>
            {
              movies.length
                ? movies.map(movie => <MovieSerialPreview type="movie" {...movie} theme={movie.slug} key={movie.id} />)
                : 'Нема фільмів'
            }
          </div>
        </div>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  serials: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.arrayOf(PropTypes.object),
  lastEpisodeView: PropTypes.shape({
    episodeTitle: PropTypes.string,
    episodeNumber: PropTypes.string,
    seasonNumber: PropTypes.string,
    serialSlug: PropTypes.string,
    serialTitle: PropTypes.string,
    endTime: PropTypes.number,
    nextEpisode: PropTypes.shape({
      number: PropTypes.string,
      title: PropTypes.string,
      seasonNumber: PropTypes.string,
      serialSlug: PropTypes.string,
    }),
  }),
  lastMovieView: PropTypes.shape({
    movieTitle: PropTypes.string,
    movieSlug: PropTypes.string,
    endTime: PropTypes.number,
  }),
  lastUploads: PropTypes.shape({
    fresh: PropTypes.bool,
    number: PropTypes.number,
  }),
};

IndexPage.defaultProps = {
  serials: [],
  movies: [],
  lastEpisodeView: null,
  lastMovieView: null,
  lastUploads: {},
};

export default withLastUploads(withSession(IndexPage));
