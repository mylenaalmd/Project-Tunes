import React from 'react';
import Header from '../componentes/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" />
      </>
    );
  }
}

export default Profile;
