import React from 'react';
import Head from 'next/head';

import config from '../config';

import Layout from '../components/Layout';

import styles from '../styles/pages/donate.module.scss';

const DonatePage = () => (
  <Layout>
    <Head><title>{`Закинути на «Живчик» / ${config.pageTitle}`}</title></Head>
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.text}>
          <p>
            <span>Підтримка цього сайту коштує </span>
            <b>6$</b>
            <span> щомісяця (хостинг і всяке таке).</span>
          </p>
          <p>Якшо комусь буде нічим зайнятись, можете закинути мені пару гривень на картку.</p>
        </div>
      </div>
      <div className={styles.paymentWrapper}>
        <a
          href="https://privatbank.ua/sendmoney?payment=eb95468092"
          target="_blank"
          rel="noreferrer noopener"
          className={styles.paymentButton}
        >
          <b>Закинути на «Живчик»</b>
        </a>
      </div>
    </div>
  </Layout>
);

export default DonatePage;
