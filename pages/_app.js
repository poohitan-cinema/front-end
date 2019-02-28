import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import cookies from 'nookies';

import CurrentUserContext from '../contexts/current-user';

import config from '../config';
import '../styles/global.scss';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { user } = cookies.get(ctx);
    const currentUser = user ? JSON.parse(user) : {};

    return { pageProps, currentUser };
  }

  render() {
    const { Component, pageProps, currentUser } = this.props;

    return (
      <Container>
        <CurrentUserContext.Provider value={currentUser}>
          <Head><title>{config.pageTitle}</title></Head>
          <Component {...pageProps} />
        </CurrentUserContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
