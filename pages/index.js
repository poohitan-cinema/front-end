import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';

import SerialPreview from '../components/SerialPreview';
import MoviePreview from '../components/MoviePreview';

import Data from '../services/data';

import styles from '../styles/pages/index.scss';

const IndexPage = ({ serials, movies }) => (
  <Layout>
    <div className={styles.section}>
      <h1>Серіали</h1>
      <div className={styles.grid}>
        {
          serials.length
            ? serials.map(serial => <SerialPreview {...serial} key={serial.id} />)
            : 'Нема серіалів'
        }
      </div>
    </div>

    <div className={styles.section}>
      <h1>Фільми</h1>
      <div className={styles.grid}>
        {
          movies.length
            ? movies.map(movie => <MoviePreview {...movie} key={movie.id} />)
            : 'Нема фільмів'
        }
      </div>
    </div>
  </Layout>
);

IndexPage.getInitialProps = () => {
  const serials = Data.listSerials();
  const movies = Data.listMovies();

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
