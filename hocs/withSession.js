import React from 'react';
import PropTypes from 'prop-types';
import { parseCookies } from 'nookies';
import { getCurrentUser } from '../services/session';

export default function withSession(WrappedComponent) {
  class WithSession extends React.Component {
    static currentUser = {};

    static async getInitialProps(context) {
      const cookies = parseCookies(context);

      const wrappedComponentProps = WrappedComponent.getInitialProps
        && (await WrappedComponent.getInitialProps(context));

      const currentUser = await getCurrentUser(context.req);
      const token = cookies['cinema-token'];

      return { ...wrappedComponentProps, session: { currentUser, token } };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithSession.propTypes = {
    session: PropTypes.shape({
      currentUser: PropTypes.object,
      token: PropTypes.string,
    }).isRequired,
  };

  return WithSession;
}
