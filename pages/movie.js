import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';

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

MoviePage.getInitialProps = async ({ req, res, query }) => {
  const { movieSlug } = query;
  const cookies = parseCookies({ req });

  try {
    const [{ url: source, ...rest }] = await API.getMovies({ slug: movieSlug }, { cookies });

    return {
      source,
      ...rest,
    };
  } catch (error) {
    console.error(error);
    destroyCookie({ req }, 'token');

    return global.window ? Router.replace('/login') : res.redirect('/login');
  }
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
  icon: '',
};

export default MoviePage;
