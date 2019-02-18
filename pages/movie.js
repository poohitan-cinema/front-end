import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/Player';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

const MoviePage = ({
  title,
  description,
  icon,
  source,
  slug,
}) => {
  const breadcrumbs = [
    {
      icon,
      title,
      href: `/movie?slug=${slug}`,
      as: `/movies/${slug}`,
    },
  ];

  return (
    <Layout>
      <Breadcrumbs crumbs={breadcrumbs} theme={slug} />
      <div className={styles.wrapper}>
        <div className={styles.playerWrapper}>
          <Player source={source} theme={slug} className={styles.player} />
        </div>
        {
          description && <div className={styles.description}>{description}</div>
        }
      </div>
    </Layout>
  );
};

MoviePage.getInitialProps = async ({ query }) => {
  const { movieSlug } = query;
  const [{ url: source, ...rest }] = await API.getMovies({ slug: movieSlug });

  return {
    source,
    ...rest,
  };
};

MoviePage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  slug: PropTypes.string.isRequired,
  icon: PropTypes.string,
  source: PropTypes.string.isRequired,
};

MoviePage.defaultProps = {
  description: '',
};

export default MoviePage;
