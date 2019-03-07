import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import API from '../../services/api';

import Button from '../ui/Button';

class RandomEpisodeButton extends React.Component {
  constructor(props) {
    super(props);

    this.redirectToRandomEpisode = this.redirectToRandomEpisode.bind(this);
  }

  async redirectToRandomEpisode() {
    const { serialId } = this.props;
    const { number, season, serial } = await API.getRandomEpisode({ serialId });

    Router.push(
      `/episode?number=${number}&seasonNumber=${season.number}&serialSlug=${serial.slug}`,
      `/serials/${serial.slug}/seasons/${season.number}/episodes/${number}`,
    );
  }

  render() {
    const { serialId, theme } = this.props;
    const label = serialId ? 'Випадкова серія' : 'Геть випадкова серія';

    return <Button light icon="fas fa-magic" theme={theme} onClick={this.redirectToRandomEpisode}>{label}</Button>;
  }
}

RandomEpisodeButton.propTypes = {
  serialId: PropTypes.string,
  theme: PropTypes.string,
};

RandomEpisodeButton.defaultProps = {
  serialId: null,
  theme: '',
};

export default RandomEpisodeButton;
