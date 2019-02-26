import React from 'react';
import Router from 'next/router';

import API from '../../services/api';

import Button from '../ui/Button';

class RandomMovieButton extends React.Component {
  static async redirectToRandomMovie() {
    const { movie } = await API.getRandomMovie();

    Router.push(
      `/movie?slug=${movie.slug}`,
      `/movies/${movie.slug}`,
    );
  }

  render() {
    return <Button light icon="fas fa-magic" onClick={RandomMovieButton.redirectToRandomMovie}>Випадковий фільм</Button>;
  }
}

export default RandomMovieButton;
