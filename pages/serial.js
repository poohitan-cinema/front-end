import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import config from '../config';

import withSession from '../hocs/withSession';

import Layout from '../components/Layout';
import SeasonPreview from '../components/SeasonPreview';
import Breadcrumbs from '../components/Breadcrumbs';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';
import LastViewedThing from '../components/LastViewedThing';

import API from '../services/api';

import styles from '../styles/pages/serial.scss';

class SerialPage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const { slug } = query;
    const cookies = parseCookies({ req });

    try {
      const serial = await API.serials.getOne({ slug }, { cookies });
      const lastEpisodeView = await API.videoViews.getForLastEpisode({ serialId: serial.id }, { cookies });

      return { ...serial, lastEpisodeView };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const {
      id, slug, title, icon, seasons, lastEpisodeView,
    } = this.props;
    const breadcrumbs = [
      {
        icon,
        title,
      },
    ];

    return (
      <Layout>
        <Head><title>{`${title} / ${config.pageTitle}`}</title></Head>
        <div className={styles.header}>
          <Breadcrumbs crumbs={breadcrumbs} theme={slug} />
          <div className={`${styles.navigation} ${lastEpisodeView ? styles.fullWidth : ''}`}>
            {
              lastEpisodeView && <LastViewedThing {...lastEpisodeView} className={styles.lastView} />
            }
            <RandomEpisodeButton theme={slug} serialId={id} />
          </div>
        </div>
        <div className={styles.grid}>
          {
            seasons.length
              ? seasons.map(season => <SeasonPreview {...season} serialSlug={slug} theme={slug} key={season.id} />)
              : 'Нема сезонів'
          }
        </div>
      </Layout>
    );
  }
}

SerialPage.propTypes = {
  id: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,

  lastEpisodeView: PropTypes.shape({
    episodeTitle: PropTypes.string,
    episodeNumber: PropTypes.string,
    seasonNumber: PropTypes.string,
    serialSlug: PropTypes.string,
    serialTitle: PropTypes.string,
    endTime: PropTypes.number,
    nextEpisode: PropTypes.shape({
      number: PropTypes.string,
      title: PropTypes.string,
      seasonNumber: PropTypes.string,
      serialSlug: PropTypes.string,
    }),
  }),
};

SerialPage.defaultProps = {
  icon: '',
  lastEpisodeView: null,
};

export default withSession(SerialPage);
