import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SeasonPreview from '../components/SeasonPreview';
import Breadcrumbs from '../components/Breadcrumbs';

import API from '../services/api';

import styles from '../styles/pages/serial.scss';

const SerialPage = ({
  slug, title, icon, seasons,
}) => {
  const breadcrumbs = [
    {
      icon,
      title,
    },
  ];

  return (
    <Layout>
      <div className={styles.heading}>
        <Breadcrumbs crumbs={breadcrumbs} theme={slug} />
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
};

SerialPage.getInitialProps = async ({ query }) => {
  const { slug } = query;
  const [serial] = await API.getSerials({ slug });
  const seasons = await API.getSeasons({ serialId: serial.id });

  return { ...serial, seasons };
};

SerialPage.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SerialPage.defaultProps = {
  icon: '',
};

export default SerialPage;
