import React from 'react';
import PropTypes from 'prop-types';

import Breadcrumb from './breadcrumbs/Breadcrumb';
import Separator from './breadcrumbs/Separator';

import styles from '../styles/components/breadcrumbs.scss';

const Breadcrumbs = ({ crumbs, theme }) => (
  <div className={styles.wrapper}>
    {
      crumbs
        .map((crumb, index) => (
          <Breadcrumb
            {...crumb}
            key={crumb.title}
            theme={theme}
            disabled={index === crumbs.length - 1}
          />
        ))
        .reduce((previous, current) => [previous, <Separator key={`${previous.title}*`} />, current])
    }
  </div>
);

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.string,
};

Breadcrumbs.defaultProps = {
  crumbs: [],
  theme: '',
};

export default Breadcrumbs;
