import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    inputName: '',
    loading: true,
  }

  componentDidMount = () => {
    this.verifyName();
  }

  verifyName = async () => {
    const user = await getUser();
    this.setState({ inputName: user.name });
    this.setState({ loading: false });
  }

  render() {
    const { inputName, loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        TrybeTunes
        <Link to="/">home</Link>
        <Link data-testid="link-to-search" to="/search">search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">profile</Link>
        <p data-testid="header-user-name">{inputName}</p>
      </header>
    );
  }
}

export default Header;
