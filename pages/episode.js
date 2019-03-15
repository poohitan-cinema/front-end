import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import CurrentUserContext from '../contexts/current-user';

import config from '../config';

import Layout from '../components/Layout';
import Breadcrumbs from '../components/Breadcrumbs';
import Player from '../components/ui/Player';
import ContentEditable from '../components/ui/ContentEditable';

import NextEpisodeButton from '../components/episode/NextEpisodeButton';
import PreviousEpisodeButton from '../components/episode/PreviousEpisodeButton';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

const DEFAULT_TITLE = 'Тут має бути назва серії';
const DEFAULT_DESCRIPTION = 'Тут має бути опис серії';

class EpisodePage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const {
      serialSlug, seasonNumber, number, time,
    } = query;
    const cookies = parseCookies({ req });

    try {
      const episode = await API.episodes.getOne({ number, seasonNumber, serialSlug }, { cookies });

      return { ...episode, time: Number(time) };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      description: props.description,
    };

    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();

    this.saveEpisode = this.saveEpisode.bind(this);
    this.trackView = this.trackView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('unload', () => this.trackView());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return {
        id: props.id,
        title: props.title,
        description: props.description,
      };
    }

    return state;
  }

  async trackView() {
    const { id: userId, token } = this.context;
    const { videoId } = this.props;
    const { currentPlayerTime } = this.state;

    return API.videoViews.track({
      endTime: currentPlayerTime,
      videoId,
      userId,
      token,
    });
  }

  async saveEpisode() {
    const { id } = this.props;

    const { title, description } = this.state;
    const cookies = parseCookies();

    return API.episodes.update(id, { title, description }, { cookies });
  }

  render() {
    const {
      id,
      number,
      url,
      previousEpisode,
      nextEpisode,
      serial,
      season,
      time,
    } = this.props;

    const { title, description } = this.state;
    const currentUser = this.context;
    const isAdmin = currentUser.role === 'admin';

    const breadcrumbs = [
      {
        icon: serial.icon,
        title: serial.title,
        href: `/serial?slug=${serial.slug}`,
        as: `/serials/${serial.slug}`,
      },
      {
        title: `Сезон ${season.number}`,
        href: `/season?number=${season.number}&serialSlug=${serial.slug}`,
        as: `/serials/${serial.slug}/seasons/${season.number}`,
      },
      {
        title: `Серія ${number}`,
      },
    ];

    return (
      <Layout>
        <Head>
          <title>{`${serial.title} – Cезон ${season.number}, Cерія ${number} / ${config.pageTitle}`}</title>
        </Head>
        <Breadcrumbs crumbs={breadcrumbs} theme={serial.slug} />
        <div className={`${styles.wrapper} ${styles[serial.slug]}`}>
          {
            (title || isAdmin)
            && (
              <ContentEditable
                innerRef={this.titleRef}
                content={title}
                placeholder={DEFAULT_TITLE}
                disabled={!isAdmin}
                onChange={event => this.setState({ title: event.target.value })}
                onBlur={this.saveEpisode}
                tagName="h2"
                className={styles.title}
              />
            )
          }
          <div className={styles.playerWrapper}>
            {
              url
                ? (
                  <Player
                    key={id}
                    source={url}
                    startAt={time}
                    theme={serial.slug}
                    onTimeUpdate={currentTime => this.setState({ currentPlayerTime: currentTime })}
                    onEnd={this.trackView}
                    className={styles.player}
                  />
                )
                : 'Цієї серії ше немає'
            }
          </div>
          <div className={styles.footer}>
            <PreviousEpisodeButton
              episodeNumber={previousEpisode.number}
              seasonNumber={season.number}
              serialSlug={serial.slug}
              theme={serial.slug}
            />
            <RandomEpisodeButton theme={serial.slug} serialId={serial.id} />
            <NextEpisodeButton
              episodeNumber={nextEpisode.number}
              seasonNumber={season.number}
              serialSlug={serial.slug}
              theme={serial.slug}
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
                onBlur={this.saveEpisode}
                className={styles.description}
              />
            )
          }
        </div>
      </Layout>
    );
  }
}

EpisodePage.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  videoId: PropTypes.string,
  time: PropTypes.number,
  previousEpisode: PropTypes.shape({
    number: PropTypes.string,
  }),
  nextEpisode: PropTypes.shape({
    number: PropTypes.string,
  }),
  serial: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  season: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

EpisodePage.defaultProps = {
  title: '',
  description: '',
  videoId: null,
  time: 0,
  previousEpisode: {
    number: null,
  },
  nextEpisode: {
    number: null,
  },
};

EpisodePage.contextType = CurrentUserContext;

export default EpisodePage;
