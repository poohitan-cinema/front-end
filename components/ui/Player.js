import React from 'react';
import PropTypes from 'prop-types';
import Plyr from 'plyr';

import styles from '../../styles/components/ui/player.scss';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.videoElement = React.createRef();
  }

  componentDidMount() {
    const { autoplay, startAt, onTimeUpdate } = this.props;

    const player = new Plyr(this.videoElement.current, { // eslint-disable-line
      autoplay,
      seekTime: 5,
      ratio: '16:9',
      keyboard: {
        focused: true,
        global: true,
      },
    });

    onTimeUpdate(0);

    if (startAt) {
      player.once('canplay', () => {
        player.currentTime = startAt;
      });

      player.currentTime = startAt;
    }

    player.on('timeupdate', () => {
      if (player.currentTime === startAt) {
        return;
      }

      onTimeUpdate(player.currentTime);
    });

    player.on('loadeddata', () => { player.currentTime = player.currentTime; });

    this.setState({ player });
  }

  componentWillUnmount() {
    const { player } = this.state;
    const { onEnd } = this.props;

    onEnd();

    player.destroy();
  }

  render() {
    const { source, theme, className } = this.props;
    const classList = [styles.wrapper, className];

    if (theme) {
      classList.push(styles[theme]);
    }

    return (
      <div className={classList.join(' ')}>
        <video controls src={source} ref={this.videoElement} className={styles.video} />
      </div>
    );
  }
}

Player.propTypes = {
  source: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  theme: PropTypes.string,
  startAt: PropTypes.number,
  onTimeUpdate: PropTypes.func,
  onEnd: PropTypes.func,
  className: PropTypes.string,
};

Player.defaultProps = {
  autoplay: false,
  theme: '',
  startAt: 0,
  onTimeUpdate: () => {},
  onEnd: () => {},
  className: '',
};

export default Player;
