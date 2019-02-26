import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies, destroyCookie } from 'nookies';

import config from '../config';

import Layout from '../components/Layout';
import SeasonPreview from '../components/SeasonPreview';
import Breadcrumbs from '../components/Breadcrumbs';
import RandomEpisodeButton from '../components/episode/RandomEpisodeButton';

import API from '../services/api';

import styles from '../styles/pages/serial.scss';

class SerialPage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const { slug } = query;
    const cookies = parseCookies({ req });

    try {
      const serial = await API.getSerial({ slug }, { cookies });

      return serial;
    } catch (error) {
      console.error(error);
      destroyCookie({ req }, 'token');

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const {
      id, slug, title, icon, seasons,
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
          <RandomEpisodeButton theme={slug} serialId={id} />
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
  id: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SerialPage.defaultProps = {
  icon: '',
};

export default SerialPage;
