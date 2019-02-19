import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';
import Layout from '../components/Layout';

import MovieSerialPreview from '../components/MovieSerialPreview';

import API from '../services/api';

import styles from '../styles/pages/index.scss';

const IndexPage = ({ serials, movies }) => (
  <Layout>
    <div className={styles.section}>
      <h1>Серіали</h1>
      <div className={styles.grid}>
        {
          serials.length
            ? serials.map(serial => <MovieSerialPreview type="serial" {...serial} theme={serial.slug} key={serial.id} />)
            : 'Нема серіалів'
        }
      </div>
    </div>

    <div className={styles.section}>
      <h1>Фільми</h1>
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

IndexPage.getInitialProps = async ({ req, res }) => {
  const cookies = parseCookies({ req });

  try {
    const serials = await API.getSerials({}, { cookies });
    const movies = await API.getMovies({}, { cookies });

    return { movies, serials };
  } catch (error) {
    destroyCookie({ req }, 'token');

    return global.window ? Router.replace('/login') : res.redirect('/login');
  }
};

IndexPage.propTypes = {
  serials: PropTypes.arrayOf(PropTypes.object),
  movies: PropTypes.arrayOf(PropTypes.object),
};

IndexPage.defaultProps = {
  serials: [],
  movies: [],
};

export default IndexPage;
