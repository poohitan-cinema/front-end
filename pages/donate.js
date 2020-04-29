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
        <p>
          <span>Підтримка цього сайту коштує </span>
          <b>6$</b>
          <span> щомісяця (хостинг і всяке таке)</span>
        </p>
        <p>Якшо комусь буде нічим зайнятись, може закинути мені пару гривень на пивко на якусь з цих карток:</p>
        <ul>
          <li>
            <b>5355 1719 4209 1058</b>
            <span> (Кредобанк)</span>
          </li>
          <li>
            <b>5168 7520 1001 9548</b>
            <span> (Приватбанк)</span>
          </li>
        </ul>
      </div>
      <div className={styles.smiley}>
        <img alt="Пивко" title="Будьмо, гей" src="/static/smiley-with-beer.png" />
      </div>
    </div>
  </Layout>
);

export default DonatePage;
