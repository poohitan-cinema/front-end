import React from 'react';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SeasonPreview from '../components/SeasonPreview';

import Data from '../services/data';

import styles from '../styles/pages/serial.scss';

const SerialPage = ({
  title, id, icon, seasons,
}) => (
  <Layout>
    <div className={styles.heading}>
      {
        icon && <div className={styles.icon} style={{ backgroundImage: `url("${icon}")` }} />
      }
      <h1 className={`${styles.title} ${styles[id]}`}>{title}</h1>
    </div>
    <div className={styles.grid}>
      {
        seasons.map(season => <SeasonPreview {...season} serialId={id} key={season.id} />)
      }
    </div>
  </Layout>
);

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
