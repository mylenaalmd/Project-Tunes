import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    newUser: false,
    inputEmail: '',
    inputName: '',
    inputDescription: '',
    image: '',
  }

  async componentDidMount() {
    this.setState({ loading: true });
    await getUser();
    this.setState({ loading: false });
  }

  handleClick = async (e) => {
    const { inputName, inputEmail, inputDescription, image } = this.state;
    e.preventDefault();
    this.setState({ loading: true });
    await updateUser({
      name: inputName,
      email: inputEmail,
      image,
      description: inputDescription });
    this.setState({ loading: false, newUser: true });
  }

  handleChange = ({ target }) => {
    this.setState({ [value]: target.value });
  }

  render() {
    const { loading, newUser, inputName,
      inputDescription, image, inputEmail } = this.state;

    if (newUser) {
      <Redirect to="/profile " />;
    }

    return (
      <div>
        {loading ? (<Loading />
        ) : (
          <div>
            <Header />
            <div data-testid="page-profile-edit" />
            <section>
              <form className="form">
                <br />
                <label htmlFor="name">
                  Nome:
                  <br />
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="inputName"
                    value={ inputName }
                    required
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <br />
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    name="inputEmail"
                    value={ inputEmail }
                    required
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="description">
                  Description:
                  <br />
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    name="inputDescription"
                    required
                    value={ inputDescription }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="image">
                  Imagem:
                  <br />
                  <input
                    data-testid="edit-input-image"
                    type="file"
                    required
                    value={ image }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                >
                  Salvar
                </button>
              </form>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
