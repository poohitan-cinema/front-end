import React from 'react';
import PropTypes from 'prop-types';
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

IndexPage.getInitialProps = async () => {
  const serials = await API.getSerials();
  const movies = await API.getMovies();

  return { movies, serials };
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
