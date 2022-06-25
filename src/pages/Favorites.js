import React from 'react';
import Header from '../componentes/Header';
import MusicCard from '../componentes/MusicCard';
import Loading from '../componentes/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: true,
    songs: [],
    // isChecked: true,
  }

  async componentDidMount() {
    const listSongsLocalStorage = await getFavoriteSongs();
    this.setState({ loading: false,
      songs: listSongsLocalStorage });
  }

  removeSongsFavorite = (music) => {
    const { songs } = this.state;
    const musicasFavoritas = songs.filter((item) => item.trackId !== music.trackId);
    this.setState({ songs: musicasFavoritas });
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
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  previewUrl={ song.url }
                  songs={ songs }
                  removeSongsFavorite={ this.removeSongsFavorite }
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
