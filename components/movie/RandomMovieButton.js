import React from 'react';
import Router from 'next/router';

import API from '../../services/api';

import Button from '../ui/Button';

class RandomMovieButton extends React.Component {
  static async redirectToRandomMovie() {
    const { slug } = await API.movies.getRandom();

    Router.push(
      `/movie?slug=${slug}`,
      `/movies/${slug}`,
    );
  }

  render() {
    return <Button light icon="fas fa-magic" onClick={RandomMovieButton.redirectToRandomMovie}>Випадковий фільм</Button>;
  }
}

export default RandomMovieButton;
