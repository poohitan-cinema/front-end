import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

import Layout from '../components/Layout';
import MovieSerialPreview from '../components/MovieSerialPreview';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';
import RandomMovieButton from '../components/movie/RandomMovieButton';

import API from '../services/api';

import styles from '../styles/pages/index.scss';

class IndexPage extends React.Component {
  static async getInitialProps({ req, res }) {
    const cookies = parseCookies({ req });

    try {
      const serials = await API.getSerials({}, { cookies });
      const movies = await API.getMovies({}, { cookies });

      return { movies, serials };
    } catch (error) {
      destroyCookie({ req }, 'token');

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  static async redirectToRandomEpisode() {
    const { number, season, serial } = await API.getRandomEpisode();

    Router.push(
      `/episode?number=${number}&seasonNumber=${season.number}&serialSlug=${serial.slug}`,
      `/serials/${serial.slug}/seasons/${season.number}/episodes/${number}`,
    );
  }

  static async redirectToRandomMovie() {
    const movie = await API.getRandomMovie();

    Router.push(
      `/movies?slug=${movie.slug}`,
      `/movies/${movie.slug}`,
    );
  }

  render() {
    const { serials, movies } = this.props;

    return (
      <Layout>
        <div className={styles.section}>
          <div className={styles.header}>
            <h1>Серіали</h1>
            {
              serials.length
                ? <RandomEpisodeButton />
                : null
            }
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
            {
              movies.length
                ? <RandomMovieButton />
                : null
            }
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
};

IndexPage.defaultProps = {
  serials: [],
  movies: [],
};

export default IndexPage;
