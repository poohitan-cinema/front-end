import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Head from 'next/head';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { parseCookies } from 'nookies';

import config from '../config';
import Layout from '../components/Layout';
import API from '../services/api';
import Colors from '../services/colors';
import pluralize from '../helpers/pluralize';

import Button from '../components/ui/Button';

import styles from '../styles/pages/stats.scss';

class StatsPage extends React.Component {
  static async getInitialProps({ req, res, query }) {
    const cookies = parseCookies({ req });

    const defaultFilter = StatsPage.getFilters().find(filter => filter.default);
    const from = query.from || defaultFilter.from;
    const to = query.to || defaultFilter.to;

    try {
      const { stats } = await API.videoViews.getStats({ from, to }, { cookies });

      return {
        stats,
        from,
        to,
      };
    } catch (error) {
      console.error(error);

      return global.window ? Router.replace('/login') : res.redirect('/login');
    }
  }

  static getFilters() {
    return [
      {
        title: 'Цей місяць',
        from: moment.utc().startOf('month').toISOString(),
        to: moment.utc().endOf('day').toISOString(),
        default: true,
      },
      {
        title: 'Минулий місяць',
        from: moment.utc().subtract(1, 'months').startOf('month').toISOString(),
        to: moment.utc().subtract(1, 'months').endOf('month').toISOString(),
      },
      {
        title: 'Цей рік',
        from: moment.utc().startOf('year').toISOString(),
        to: moment.utc().endOf('day').toISOString(),
      },
      {
        title: 'Весь час',
        from: moment(0).toISOString(),
        to: moment.utc().endOf('day').toISOString(),
      },
    ];
  }

  static setFilter({ from, to = moment.utc() }) {
    Router.replace(`/stats?from=${from}&to=${to}`);
  }

  static generateChartData(data) {
    const labels = data.map(item => item.label);

    return {
      labels,
      datasets: [
        {
          data: data.map(item => item.value),
          backgroundColor: Colors.RGBARainbow(labels.length, { opacity: 0.8 })
            .map(color => Colors.RGBAToCSSString(color)),
          hoverBackgroundColor: Colors.RGBARainbow(labels.length)
            .map(color => Colors.RGBAToCSSString(color)),
        },
      ],
    };
  }

  static getChartOptions() {
    const axisColor = 'rgba(255, 255, 255, 0.1)';

    return {
      maintainAspectRatio: true,
      legend: { display: false },
      scales: {
        yAxes: [{
          gridLines: { color: axisColor },
          ticks: {
            beginAtZero: true,
            callback(value) {
              return Number.isInteger(value) ? value : null;
            },
          },
        }],
        xAxes: [
          {
            gridLines: { color: axisColor },
          },
        ],
      },
      tooltips: {
        titleFontSize: 18,
        titleFontFamily: 'Source Sans Pro',
        titleMarginBottom: 0,
        xPadding: 12,
        yPadding: 12,
        cornerRadius: 20,
        callbacks: {
          title([tooltip]) {
            const { value } = tooltip;

            return pluralize(value, ['перегляд', 'перегляди', 'переглядів']);
          },
          label() {
            return null;
          },
        },
      },
    };
  }

  generateTop({ groupBy }) {
    const { stats } = this.props;

    return stats
      .filter(item => item[groupBy])
      .reduce((accumulator, dataItem) => {
        const currentData = accumulator.find(item => item.label === dataItem[groupBy]);

        if (currentData) {
          currentData.value += 1;
        } else {
          accumulator.push({
            label: dataItem[groupBy],
            value: 1,
          });
        }

        return accumulator;
      }, [])
      .sort((left, right) => Number(left.value < right.value));
  }

  render() {
    const { from, to } = this.props;

    const topUsers = this.generateTop({ groupBy: 'userName' });
    const topSerials = this.generateTop({ groupBy: 'serialTitle' });
    const topMovies = this.generateTop({ groupBy: 'movieTitle' });

    const topUsersChartData = StatsPage.generateChartData(topUsers);
    const topSerialsChartData = StatsPage.generateChartData(topSerials);
    const topMoviesChartData = StatsPage.generateChartData(topMovies);

    const chartOptions = StatsPage.getChartOptions();

    return (
      <Layout>
        <Head><title>{`Статистика / ${config.pageTitle}`}</title></Head>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span>Показувати статистику за:</span>
            {
              StatsPage.getFilters()
                .map(filter => (
                  <Button
                    light
                    active={from === filter.from && to === filter.to}
                    key={filter.title}
                    className={styles.filter}
                    onClick={() => StatsPage.setFilter(filter)}
                  >
                    {filter.title}
                  </Button>
                ))
            }
          </div>
          <div className={styles.section}>
            <h2>Рекордсмени переглядів</h2>
            <div className={styles.row}>
              <div className={styles.chart}>
                <Bar
                  data={topUsersChartData}
                  width={100}
                  height={50}
                  options={chartOptions}
                />
              </div>
              <ol className={styles.list}>
                {
                  topUsers.map(item => (
                    <li key={item.label}>
                      <span className={styles.name}>{item.label}</span>
                      &nbsp;&mdash;&nbsp;
                      <span className={styles.viewsCount}>{item.value}</span>
                    </li>
                  ))
                }
              </ol>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.section}>
              <h2>Найпопулярніші серіали</h2>
              <div className={styles.chart}>
                <Bar
                  data={topSerialsChartData}
                  width={100}
                  height={50}
                  options={chartOptions}
                />
              </div>
            </div>
            <div className={styles.section}>
              <h2>Найпопулярніші фільми</h2>
              <div className={styles.chart}>
                <Bar
                  data={topMoviesChartData}
                  width={100}
                  height={50}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

StatsPage.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object),
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

StatsPage.defaultProps = {
  stats: [],
};

export default StatsPage;
