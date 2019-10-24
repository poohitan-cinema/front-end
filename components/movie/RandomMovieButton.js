import React from 'react';
import PropTypes from 'prop-types';
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
    const { className } = this.props;

    return <Button light icon="fas fa-magic" className={className} onClick={RandomMovieButton.redirectToRandomMovie}>Випадковий фільм</Button>;
  }
}

RandomMovieButton.propTypes = {
  className: PropTypes.string,
};

RandomMovieButton.defaultProps = {
  className: '',
};

export default RandomMovieButton;
