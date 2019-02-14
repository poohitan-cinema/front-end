import React from 'react';
import PropTypes from 'prop-types';
import Plyr from 'plyr';

import styles from '../styles/components/player.scss';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.videoElement = React.createRef();
  }

  componentDidMount() {
    const plyr = new Plyr(this.videoElement.current, { // eslint-disable-line
      seekTime: 5,
      keyboard: {
        focused: true,
        global: true,
      },
    });
  }

  render() {
    const { source } = this.props;

    return (
      <div className={styles.wrapper}>
        <video controls src={source} ref={this.videoElement} className={styles.video} />
      </div>
    );
  }
}

Player.propTypes = {
  source: PropTypes.string.isRequired,
};

export default Player;
