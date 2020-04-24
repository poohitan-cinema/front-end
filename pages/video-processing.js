import React from 'react';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import config from '../config';

import withSession from '../hocs/withSession';

import Layout from '../components/Layout';
import FileInput from '../components/ui/FileInput';

import API from '../services/api';

import styles from '../styles/pages/video-processing.module.scss';

class VideoProcessingPage extends React.Component {
  static async getInitialProps({ req, res }) {
    try {
      const cookies = parseCookies({ req });
      const currentUser = JSON.parse(cookies['cinema-user']);

      if (currentUser.role !== 'admin') {
        throw new Error('Сторінка доступна тільки для адміністраторів');
      }

      return { cookies };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      torrentParsingInProgress: false,
    };

    this.parseTorrentFile = this.parseTorrentFile.bind(this);
  }

  async parseTorrentFile(file) {
    this.setState({ torrentParsingInProgress: true });

    try {
      const torrentContent = await API.processVideos.parseTorrentContent(file);

      console.log(torrentContent);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ torrentParsingInProgress: false });
    }
  }

  render() {
    const { torrentParsingInProgress } = this.state;

    return (
      <Layout>
        <Head>
          <title>{`Завантаження відео / ${config.pageTitle}`}</title>
        </Head>
        <div className={styles.wrapper}>
          <FileInput
            id="torrent-file-input"
            label="Вибрати торент файл"
            disabled={torrentParsingInProgress}
            onChange={newTorrentFile => this.parseTorrentFile(newTorrentFile)}
          />
        </div>
      </Layout>
    );
  }
}

export default withSession(VideoProcessingPage);
