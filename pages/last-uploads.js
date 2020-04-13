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
import FireLight from '../components/ui/FireLight';
import API from '../services/api';

import styles from '../styles/pages/last-uploads.module.scss';

class LastUploadsPage extends React.Component {
  static async getInitialProps({ req, res }) {
    const cookies = parseCookies({ req });

    try {
      const lastUploads = await API.getLastUploads({}, { cookies });

      return {
        lastUploads,
      };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  render() {
    const { lastUploads } = this.props;

    return (
      <Layout>
        <Head><title>{`Останні оновлення / ${config.pageTitle}`}</title></Head>
        <div className={styles.wrapper}>
          <div className={styles.list}>
            {
              lastUploads
                .fresh
                .map(item => <UploadedItem isFresh key={item.id} {...item} />)
            }
            {
              lastUploads
                .rest
                .map(item => <UploadedItem key={item.id} {...item} />)
            }
            <div className={styles.shadow} />
          </div>
        </div>
      </Layout>
    );
  }
}

LastUploadsPage.propTypes = {
  lastUploads: PropTypes.shape({
    fresh: PropTypes.array,
    rest: PropTypes.array,
  }),
};

LastUploadsPage.defaultProps = {
  lastUploads: {},
};

const UploadedItem = ({
  title, number, seasonNumber, serialSlug, serialTitle, slug, type, timestamp, isFresh,
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
  const classList = [styles.item];

  if (isFresh) {
    classList.push(styles.itemNew);
  }

  return (
    <Link href={href} as={as}>
      <a className={classList.join(' ')}>
        {
          isFresh ? <FireLight title="Нове" className={styles.firelight} /> : null
        }
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

UploadedItem.propTypes = {
  title: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  number: PropTypes.string,
  seasonNumber: PropTypes.string,
  serialSlug: PropTypes.string,
  serialTitle: PropTypes.string,
  slug: PropTypes.string,
  type: PropTypes.string.isRequired,
  isFresh: PropTypes.bool,
};

UploadedItem.defaultProps = {
  title: '',
  number: '',
  seasonNumber: '',
  serialSlug: '',
  serialTitle: '',
  slug: '',
  isFresh: false,
};

export default withSession(LastUploadsPage);
