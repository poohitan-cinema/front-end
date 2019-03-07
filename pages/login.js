import React from 'react';
import cookies from 'nookies';
import Router from 'next/router';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

import API from '../services/api';

import styles from '../styles/pages/login.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.login = this.login.bind(this);
  }

  async login() {
    const { name, password } = this.state;

    this.setState({ loginInProgress: true });

    cookies.destroy({}, 'token');
    cookies.destroy({}, 'user');

    try {
      const { token, user } = await API.login({ name, password });
      const { hostname } = document.location;

      if (token) {
        cookies.set({}, 'token', token, { domain: hostname });
        cookies.set({}, 'user', JSON.stringify(user), { domain: hostname });
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
