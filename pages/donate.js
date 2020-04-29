import React from 'react';
import Head from 'next/head';

import config from '../config';

import Layout from '../components/Layout';

import styles from '../styles/pages/donate.module.scss';

const DonatePage = () => (
  <Layout>
    <Head><title>{`Закинути на пивко / ${config.pageTitle}`}</title></Head>
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.text}>
          <p>
            <span>Підтримка цього сайту коштує </span>
            <b>6$</b>
            <span> щомісяця (хостинг і всяке таке).</span>
          </p>
          <p>Якшо комусь буде нічим зайнятись, можете закинути мені пару гривень на картку Приватбанку.</p>
        </div>
      </div>
      <div className={styles.paymentWrapper}>
        <a
          href="https://privatbank.ua/sendmoney?payment=32d88a48ef"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.paymentButton}
        >
          <b>Закинути на пивко</b>
        </a>
      </div>
      <div className={styles.smiley}>
        <img alt="Пивко" title="Будьмо, гей" src="/static/smiley-with-beer.png" />
      </div>
    </div>
  </Layout>
);

export default DonatePage;
