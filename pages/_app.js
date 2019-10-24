import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import NProgress from 'next-nprogress/component';

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
        <NProgress color="#fff" spinner={false} />
        <Head><title>{config.pageTitle}</title></Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
