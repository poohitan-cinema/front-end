import React from 'react';
import { parseCookies } from 'nookies';
import API from '../services/api';

export default function withSession(WrappedComponent) {
  class WithLastUploads extends React.Component {
    static currentUser = {};

    static async getInitialProps(context) {
      const cookies = parseCookies(context);

      const wrappedComponentProps = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(context));

      const lastUploads = await API.getLastUploads({ meta: true }, { cookies });

      return { ...wrappedComponentProps, lastUploads };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithLastUploads;
}
