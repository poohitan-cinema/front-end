import React from 'react';
import Router from 'next/router';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import { logIn, isAuthenticated } from '../services/session';

import styles from '../styles/pages/login.module.scss';

class LoginPage extends React.Component {
  static async getInitialProps({ req, res }) {
    if (isAuthenticated(req)) {
      res.redirect('/');
    }

    return {};
  }

  constructor(props) {
    super(props);

    this.state = {};

    this.login = this.login.bind(this);
  }

  async login() {
    const { name, password } = this.state;

    this.setState({ loginInProgress: true });

    try {
      await logIn({ name, password });

      Router.push('/');
    } catch (error) {
      window.alert(error.message);
    } finally {
      this.setState({ loginInProgress: false });
    }
  }

  render() {
    const { name, password, loginInProgress } = this.state;

    return (
      <div className={styles.wrapper}>
        <h2>Фільми на халяву, без реклами і всякої туфти</h2>
        <h3>Лише для своїх чуваків і чувіх</h3>
        <div className={styles.loginForm}>
          <Input
            placeholder="Ім'я"
            value={name}
            disabled={loginInProgress}
            icon="far fa-laugh"
            onChange={enteredName => this.setState({ name: enteredName })}
            className={styles.input}
          />
          <Input
            placeholder="Пароль"
            value={password}
            disabled={loginInProgress}
            icon="fas fa-key"
            type="password"
            onChange={enteredPassword => this.setState({ password: enteredPassword })}
            className={styles.input}
          />
          <Button disabled={loginInProgress} onClick={this.login}>Увійти</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
