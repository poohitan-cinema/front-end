import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import ContentEditable from 'react-contenteditable';
import { parseCookies, destroyCookie } from 'nookies';

import CurrentUserContext from '../contexts/current-user';

import config from '../config';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/ui/Player';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

class MoviePage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const { movieSlug, time } = query;
    const cookies = parseCookies({ req });

    try {
      const [movie] = await API.getMovies({ slug: movieSlug }, { cookies });

      return { ...movie, time };
    } catch (error) {
      console.error(error);
      destroyCookie({ req }, 'token');

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  constructor(props) {
    super(props);

    this.state = { id: props.id, title: props.title, description: props.description };

    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();

    this.saveMovie = this.saveMovie.bind(this);
    this.trackView = this.trackView.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return { id: props.id, title: props.title, description: props.description };
    }

    return state;
  }

  async trackView() {
    const { id: userId, token } = this.context;
    const { videoId, time } = this.props;
    const { currentPlayerTime } = this.state;

    if (currentPlayerTime === time) {
      return Promise.resolve();
    }

    return API.trackVideoView({
      endTime: currentPlayerTime,
      videoId,
      userId,
      token,
    });
  }

  async saveMovie() {
    const { id } = this.props;

    const { title, description } = this.state;
    const cookies = parseCookies();

    return API.updateMovie(id, { title, description }, { cookies });
  }

  render() {
    const {
      icon,
      url,
      slug,
      time,
    } = this.props;

    const { title, description } = this.state;
    const currentUser = this.context;
    const isAdmin = currentUser.role === 'admin';

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
        <Head><title>{`${title} / ${config.pageTitle}`}</title></Head>
        <Breadcrumbs crumbs={breadcrumbs} theme={slug} />
        <div className={styles.wrapper}>
          <div className={styles.playerWrapper}>
            <Player
              source={url}
              theme={slug}
              startAt={time}
              onTimeUpdate={currentTime => this.setState({ currentPlayerTime: currentTime })}
              onEnd={this.trackView}
              className={styles.player}
            />
          </div>
          {
            description
            && (
              <ContentEditable
                innerRef={this.descriptionRef}
                html={description}
                disabled={!isAdmin}
                onChange={event => this.setState({ description: event.target.value })}
                onBlur={this.saveMovie}
                className={styles.description}
              />
            )
          }
        </div>
      </Layout>
    );
  }
}

MoviePage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  slug: PropTypes.string.isRequired,
  icon: PropTypes.string,
  url: PropTypes.string.isRequired,
  time: PropTypes.number,
  videoId: PropTypes.string,
};

MoviePage.defaultProps = {
  description: '',
  icon: '',
  time: 0,
  videoId: null,
};

MoviePage.contextType = CurrentUserContext;

export default MoviePage;
