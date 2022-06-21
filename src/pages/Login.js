import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../componentes/Loading';

class Login extends React.Component {
  state = {
    inputName: '',
    loading: false,
    isDisableBtnLogin: true,
    newPage: false,
  }

  handleClick = async (e) => {
    const { inputName } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    await createUser({ name: inputName });
    this.setState({ newPage: true });
  }

  verificyBtnLogin = () => {
    const { inputName } = this.state;
    const min = 3;

    if (inputName.length >= min) {
      this.setState({ isDisableBtnLogin: false });
    } else {
      this.setState({ isDisableBtnLogin: true });
    }
  };

  onInputChange = ({ target }) => {
    this.setState({ inputName: target.value },
      this.verificyBtnLogin);
  };

  render() {
    const { inputName, isDisableBtnLogin, loading, newPage } = this.state;
    if (newPage) {
      return <Redirect to="/search" />;
    }
    return (
      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <form className="form">
              <br />
              <label htmlFor="name">
                Nome:
                <br />
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="inputName"
                  value={ inputName }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ isDisableBtnLogin }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

export default Login;
