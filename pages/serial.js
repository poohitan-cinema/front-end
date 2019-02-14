import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SeasonPreview from '../components/SeasonPreview';
import Breadcrumbs from '../components/Breadcrumbs';

import Data from '../services/data';

import styles from '../styles/pages/serial.scss';

const SerialPage = ({
  title, id, icon, seasons,
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
        <Breadcrumbs crumbs={breadcrumbs} colorScheme={id} />
      </div>
      <div className={styles.grid}>
        {
          seasons.map(season => <SeasonPreview {...season} serialId={id} key={season.id} />)
        }
      </div>
    </Layout>
  );
};

SerialPage.getInitialProps = ({ query }) => {
  const { id } = query;
  const serial = Data.getSerial({ id });

  return serial;
};

SerialPage.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  seasons: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SerialPage.defaultProps = {
  icon: '',
};

export default SerialPage;
