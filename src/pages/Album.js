import React from 'react';
import Header from '../componentes/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album" />
      </>
    );
  }
}

export default Album;
