import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';

import config from '../config';

import withSession from '../hocs/withSession';

import Layout from '../components/Layout';
import API from '../services/api';
import Colors from '../services/colors';
import pluralize from '../helpers/pluralize';

import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';

import styles from '../styles/pages/preferences.scss';

class PreferencesPage extends React.Component { // eslint-disable-line
  // static async getInitialProps({ req, res, query }) {
  //   const cookies = parseCookies({ req });

  //   const defaultFilter = PreferencesPage.getFilters().find(filter => filter.default);
  //   const from = query.from || defaultFilter.from;
  //   const to = query.to || defaultFilter.to;

  //   try {
  //     const { stats } = await API.videoViews.getStats({ from, to }, { cookies });

  //     return {
  //       stats,
  //       from,
  //       to,
  //     };
  //   } catch (error) {
  //     console.error(error);

  //     return global.window ? Router.replace('/login') : res.redirect('/login');
  //   }
  // }

  constructor(props) {
    super(props);

    this.state = {
      testProperty: null,
    };
  }

  render() {
    const { session } = this.props;
    const { currentUser } = session;

    const { testProperty } = this.state;

    return (
      <Layout>
        <Head><title>{`Налаштування / ${config.pageTitle}`}</title></Head>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h2>Неймовірні налаштування</h2>
          </div>
          <Checkbox
            checked={testProperty}
            label="Автоматично вмикати наступні серії"
            onChange={value => this.setState({ testProperty: value })}
          />
        </div>
      </Layout>
    );
  }
}

PreferencesPage.propTypes = {
  session: PropTypes.shape({
    currentUser: PropTypes.object,
  }).isRequired,
};

export default withSession(PreferencesPage);
