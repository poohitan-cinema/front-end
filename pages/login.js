import React from 'react';
import cookies from 'nookies';
import Router from 'next/router';

import Input from '../components/Input';
import Button from '../components/Button';

import API from '../services/api';

import styles from '../styles/pages/login.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.login = this.login.bind(this);
  }

  async login() {
    const { password } = this.state;

    this.setState({ loginInProgress: true });

    try {
      const { token } = await API.login({ password });

      if (token) {
        cookies.set({}, 'token', token);
        Router.push('/');
      } else {
        window.alert('Неправильний пароль');
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loginInProgress: false });
    }
  }

  render() {
    const { password, loginInProgress } = this.state;

    return (
      <div className={styles.wrapper}>
        <h2>Фільми на халяву, без реклами і всякої туфти</h2>
        <h3>Лише для своїх чуваків і чувіх</h3>
        <div className={styles.loginForm}>
          <Input
            placeholder="Пароль"
            value={password}
            disabled={loginInProgress}
            icon="fas fa-lock"
            type="password"
            onChange={enteredPassword => this.setState({ password: enteredPassword })}
            className={styles.passwordInput}
          />
          <Button disabled={loginInProgress} onClick={this.login}>Увійти</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
