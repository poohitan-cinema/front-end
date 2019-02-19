import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import config from '../config';
import '../styles/global.scss';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head><title>{config.pageTitle}</title></Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
