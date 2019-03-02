import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

import Layout from '../components/Layout';
import MovieSerialPreview from '../components/MovieSerialPreview';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';
import RandomMovieButton from '../components/movie/RandomMovieButton';
import LastViewedThing from '../components/LastViewedThing';

import API from '../services/api';

import styles from '../styles/pages/index.scss';

class IndexPage extends React.Component {
  static async getInitialProps({ req, res }) {
    const cookies = parseCookies({ req });

    try {
      const serials = await API.getSerials({}, { cookies });
      const movies = await API.getMovies({}, { cookies });
      const lastEpisodeView = await API.getLastEpisodeView({}, { cookies });
      const lastMovieView = await API.getLastMovieView({}, { cookies });

      return {
        serials,
        movies,
        lastEpisodeView,
        lastMovieView,
      };
    } catch (error) {
      destroyCookie({ req }, 'token');

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const {
      serials,
      movies,
      lastEpisodeView,
      lastMovieView,
    } = this.props;

    return (
      <Layout>
        <div className={styles.section}>
          <div className={styles.header}>
            <h1>Серіали</h1>
            <div className={`${styles.navigation} ${lastEpisodeView ? styles.fullWidth : ''}`}>
              {
                lastEpisodeView && <LastViewedThing {...lastEpisodeView} showSerialTitle className={styles.lastView} />
              }
              {
                serials.length
                  ? <RandomEpisodeButton />
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
                  ? <RandomMovieButton />
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
    seasonNumber: PropTypes.number,
    serialSlug: PropTypes.string,
    serialTitle: PropTypes.string,
    endTime: PropTypes.number,
    nextEpisode: PropTypes.shape({
      number: PropTypes.string,
      title: PropTypes.string,
      seasonNumber: PropTypes.number,
      serialSlug: PropTypes.string,
    }),
  }),
  lastMovieView: PropTypes.shape({
    movieTitle: PropTypes.string,
    movieSlug: PropTypes.string,
    endTime: PropTypes.number,
  }),
};

IndexPage.defaultProps = {
  serials: [],
  movies: [],
  lastEpisodeView: null,
  lastMovieView: null,
};

export default IndexPage;
