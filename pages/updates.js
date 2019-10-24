import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import moment from 'moment';
import { parseCookies } from 'nookies';

import config from '../config';

import withSession from '../hocs/withSession';

import Layout from '../components/Layout';
import API from '../services/api';

import styles from '../styles/pages/updates.scss';

class UpdatesPage extends React.Component {
  static async getInitialProps({ req, res }) {
    const cookies = parseCookies({ req });

    try {
      const updates = await API.getUpdates({}, { cookies });

      return {
        updates,
      };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const { updates } = this.props;

    return (
      <Layout>
        <Head><title>{`Останні оновлення / ${config.pageTitle}`}</title></Head>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            {
              updates
                .map(item => <UpdatesItem key={item.id} {...item} />)
            }
            <div className={styles.shadow} />
          </div>
        </div>
      </Layout>
    );
  }
}

UpdatesPage.propTypes = {
  updates: PropTypes.arrayOf(PropTypes.object),
};

UpdatesPage.defaultProps = {
  updates: [],
};

const UpdatesItem = ({
  title, number, seasonNumber, serialSlug, serialTitle, slug, type, timestamp,
}) => {
  const isEpisode = type === 'episode';
  const href = isEpisode
    ? `/episodes?number=${number}&seasonNumber${seasonNumber}&serialSlug=${serialSlug}`
    : `/movies?slug=${slug}`;
  const as = isEpisode
    ? `/serials/${serialSlug}/seasons/${seasonNumber}/episodes/${number}`
    : `/movies/${slug}`;

  const itemTitle = isEpisode
    ? `${serialTitle}, сезон ${seasonNumber}, серія ${number}`
    : title;

  const date = moment(timestamp).format('DD/MM, HH:mm');

  return (
    <Link href={href} as={as}>
      <a className={styles.item}>
        <span className={styles.title}>
          {itemTitle}
        </span>
        <span className={styles.date}>
          {`(${date})`}
        </span>
      </a>
    </Link>
  );
};

UpdatesItem.propTypes = {
  title: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  number: PropTypes.string,
  seasonNumber: PropTypes.string,
  serialSlug: PropTypes.string,
  serialTitle: PropTypes.string,
  slug: PropTypes.string,
  type: PropTypes.string.isRequired,
};

UpdatesItem.defaultProps = {
  title: '',
  number: '',
  seasonNumber: '',
  serialSlug: '',
  serialTitle: '',
  slug: '',
};

export default withSession(UpdatesPage);
