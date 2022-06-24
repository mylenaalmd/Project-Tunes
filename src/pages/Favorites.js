import React from 'react';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import Loading from '../componentes/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: true,
    songs: [],
  }

  async componentDidMount() {
    const listSongsLocalStorage = await getFavoriteSongs();
    this.setState({ loading: false,
      songs: listSongsLocalStorage });
  }

  listFavorite = ({ target }) => {
    const { id } = target;
    const { songs } = this.state;
    const musicas = [...songs];
    this.setState({ loading: true }, async () => {
      const musicId = musicas.find((item) => item.trackId === Number(id));
      await removeSong(musicId);
      const musicasFavoritas = await getFavoriteSongs();
      this.setState({ songs: musicasFavoritas,
        loading: false });
    });
  }

  render() {
    const { loading, songs } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <Header />
            <div data-testid="page-favorites" />
            <section>
              {songs.map((song, index) => (
                <MusicCard
                  key={ index }
                  trackId={ song.id }
                  trackName={ song.name }
                  previewUrl={ song.url }
                  song
                  handleChange={ this.listFavorite }
                />
              ))}
            </section>
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
