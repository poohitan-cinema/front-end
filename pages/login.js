import React from 'react';

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

    const response = await API.login({ password });

    this.setState({ loginInProgress: false });

    if (response.success) {
      console.log('logged in successfully');
    } else {
      console.log('login failed');
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
          <Button icon="fas fa-lock" disabled={loginInProgress} onClick={this.login}>Увійти</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
