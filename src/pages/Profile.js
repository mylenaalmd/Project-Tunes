import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: false,
    infoLogin: {},
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const infoLogin = await getUser();
    this.setState({ infoLogin, loading: false });
  }

  render() {
    const { loading, infoLogin } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-profile" />
        {loading ? (<Loading />
        ) : (
          <div>
            <section>
              <h2>{infoLogin.name}</h2>
              <h3>{infoLogin.email}</h3>
              <img
                data-testid="profile-image"
                alt=" imagem perfil"
                src={ infoLogin.image }
              />
              <h5>{infoLogin.description}</h5>
              <Link
                to="/profile/edit"
              >
                Editar perfil

              </Link>
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
