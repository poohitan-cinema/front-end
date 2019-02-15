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
    const { autoplay } = this.props;

    const plyr = new Plyr(this.videoElement.current, { // eslint-disable-line
      autoplay,
      seekTime: 5,
      keyboard: {
        focused: true,
        global: true,
      },
    });
  }

  render() {
    const { source, theme, className } = this.props;

    return (
      <div className={`${styles.wrapper} ${styles[theme]} ${className}`}>
        <video controls src={source} ref={this.videoElement} className={styles.video} />
      </div>
    );
  }
}

Player.propTypes = {
  source: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  theme: PropTypes.string,
  className: PropTypes.string,
};

Player.defaultProps = {
  autoplay: false,
  theme: '',
  className: '',
};

export default Player;
