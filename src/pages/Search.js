import React from 'react';
import Loading from '../componentes/Loading';
import Header from '../componentes/Header';

class Search extends React.Component {
  state = {
    inputBand: '',
    loading: false,
  }

  onInputChange = ({ target }) => {
    this.setState({ inputBand: target.value });
  };

  renderBtnSearch = (e) => {
    e.preventDefault();
  }

  render() {
    const { inputBand, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {loading ? <Loading /> : (
            <form className="formSearch">
              <br />
              <label htmlFor="nameBand">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  name="inputBand"
                  value={ inputBand }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ inputBand.length < 2 }
                onClick={ this.renderBtnSearch }
              >
                Pesquisar
              </button>
            </form>
          )}
        </div>
      </>

    );
  }
}

export default Search;
