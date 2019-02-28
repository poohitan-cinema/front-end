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

import NextEpisodeButton from '../components/episode/NextEpisodeButton';
import PreviousEpisodeButton from '../components/episode/PreviousEpisodeButton';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';

import API from '../services/api';

import styles from '../styles/pages/movie.scss';

class EpisodePage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const { serialSlug, seasonNumber, number } = query;
    const cookies = parseCookies({ req });

    try {
      const episode = await API.getEpisode({ number, seasonNumber, serialSlug }, { cookies });

      return episode;
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

    this.saveEpisode = this.saveEpisode.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.id !== state.id) {
      return { id: props.id, title: props.title, description: props.description };
    }

    return state;
  }

  async saveEpisode() {
    const { id } = this.props;

    const { title, description } = this.state;
    const cookies = parseCookies();

    return API.updateEpisode(id, { title, description }, { cookies });
  }

  render() {
    const {
      number,
      url,
      previousEpisode,
      nextEpisode,
      serial,
      season,
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
            title
            && (
              <ContentEditable
                innerRef={this.titleRef}
                html={title}
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
              url ? <Player source={url} theme={serial.slug} className={styles.player} /> : 'Цієї серії ше немає'
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
            description
            && (
              <ContentEditable
                innerRef={this.descriptionRef}
                html={description}
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
  id: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
  previousEpisode: PropTypes.shape({
    number: PropTypes.string,
  }),
  nextEpisode: PropTypes.shape({
    number: PropTypes.string,
  }),
  serial: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  season: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

EpisodePage.defaultProps = {
  title: '',
  description: '',
  previousEpisode: {
    number: null,
  },
  nextEpisode: {
    number: null,
  },
};

EpisodePage.contextType = CurrentUserContext;

export default EpisodePage;
