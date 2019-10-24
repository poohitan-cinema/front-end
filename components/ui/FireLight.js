import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

class FireLight extends React.Component {
  static randomColor() {
    return `hsl(${anime.random(0, 50)}, 100%, 50%)`;
  }

  constructor(props) {
    super(props);

    this.firelight = React.createRef();
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    const keyframesNumber = anime.random(5, 50);
    const keyframesArray = Array.from({ length: keyframesNumber });
    const durations = keyframesArray.map(() => anime.random(150, 200));

    const color = durations
      .map(duration => ({
        value: `hsl(${anime.random(0, 50)}, 100%, 50%)`,
        duration,
      }));
    const translateX = durations
      .map(duration => ({
        value: `${anime.random(-1, 1)}px`,
        duration,
      }));
    const translateY = durations
      .map(duration => ({
        value: `${anime.random(-1, 1)}px`,
        duration,
      }));

    anime({
      targets: [this.firelight.current],
      loop: true,
      direction: 'alternate',
      easing: 'linear',
      color,
      translateX,
      translateY,
    });
  }

  render() {
    const { title, className } = this.props;
    const color = FireLight.randomColor();

    return (
      <div ref={this.firelight} style={{ color }} title={title} className={className}>
        <i className="fas fa-fire-alt" />
      </div>
    );
  }
}

FireLight.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

FireLight.defaultProps = {
  title: '',
  className: '',
};

export default FireLight;
