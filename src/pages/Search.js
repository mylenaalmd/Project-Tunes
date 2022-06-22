import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../componentes/Header';
import Loading from '../componentes/Loading';

class Search extends React.Component {
  state = {
    artist: '',
    inputBand: '',
    loading: false,
    albuns: [],
  }

  onInputChange = ({ target }) => {
    this.setState({ inputBand: target.value });
  };

  seachBand = async () => {
    const { inputBand } = this.state;
    const response = await searchAlbumsAPI(inputBand);
    // console.log(response);
    this.setState({ loading: true });
    this.setState({ albuns: response });
    this.setState({ loading: false });
  }

  handleBtnSearch = (e) => {
    const { inputBand } = this.state;
    e.preventDefault();
    this.seachBand();
    this.setState({ artist: inputBand });
    this.setState({ inputBand: '' });
  }

  render() {
    const { inputBand, loading, artist, albuns } = this.state;
    // console.log(albuns);

    return (
      <div>
        <Header />
        <section data-testid="page-search">
          {
            loading ? <Loading />
              : (
                <div>
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
                      onClick={ this.handleBtnSearch }
                    >
                      Pesquisar
                    </button>
                  </form>
                  Resultado de álbuns de:
                  {' '}
                  { artist }
                  <div>
                    { albuns[0]
                      ? albuns.map((item) => (
                        <section key={ item.collectionId }>
                          <Link
                            data-testid={ `link-to-album-${item.collectionId}` }
                            to={ `/album/${item.collectionId}` }
                          >
                            <div>
                              <h3>
                                {item.artistId}
                                {item.artistName}
                                {item.collectionId}
                                {item.collectionName}
                              </h3>
                              <h4>
                                Preço:
                                {item.collectionPrice}
                              </h4>
                              <p>
                                {item.artworkUrl100}
                                {item.releaseDate}
                                {item.trackCount}
                              </p>
                            </div>
                          </Link>
                        </section>
                      ))
                      : 'Nenhum álbum foi encontrado'}
                  </div>
                </div>
              )
          }
        </section>
      </div>
    );
  }
}

export default Search;
