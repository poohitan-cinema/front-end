import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import config from '../config';

import withSession from '../hocs/withSession';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/ui/Player';
import ContentEditable from '../components/ui/ContentEditable';

import API from '../services/api';

import styles from '../styles/pages/movie.module.scss';

const DEFAULT_DESCRIPTION = 'Тут має бути опис фільму';

class MoviePage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const { slug, time } = query;
    const cookies = parseCookies({ req });

    try {
      const [movie] = await API.movies.getMany({ slug }, { cookies });
      const { url, ...rest } = movie;

      return {
        source: url,
        time: Number(time),
        ...rest,
      };
    } catch (error) {
      console.error(error);

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
    const { videoId, time, session } = this.props;
    const { currentUser, token } = session;
    const { currentPlayerTime } = this.state;

    if (currentPlayerTime === time) {
      return Promise.resolve();
    }

    return API.videoViews.track({
      endTime: currentPlayerTime,
      videoId,
      userId: currentUser.id,
      token,
    });
  }

  async saveMovie() {
    const { id } = this.props;

    const { title, description } = this.state;
    const cookies = parseCookies();

    return API.movies.update(id, { title, description }, { cookies });
  }

  render() {
    const {
      id,
      icon,
      source,
      slug,
      time,
      session,
    } = this.props;

    const { title, description } = this.state;
    const { currentUser } = session;
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
              key={id}
              source={source}
              theme={slug}
              startAt={time}
              onTimeUpdate={currentTime => this.setState({ currentPlayerTime: currentTime })}
              onEnd={this.trackView}
              className={styles.player}
            />
          </div>
          {
            (description || isAdmin)
            && (
              <ContentEditable
                innerRef={this.descriptionRef}
                content={description}
                placeholder={DEFAULT_DESCRIPTION}
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
  source: PropTypes.string.isRequired,
  time: PropTypes.number,
  videoId: PropTypes.string,
  session: PropTypes.shape({}).isRequired,
};

MoviePage.defaultProps = {
  description: '',
  icon: '',
  time: 0,
  videoId: null,
};

export default withSession(MoviePage);
