import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
  }

  async componentDidMount() {
    const getSongs = await getFavoriteSongs();
    this.setState({ isChecked: this.checkBox(getSongs) });
  }

  checkedButton = async ({ target }) => {
    const { trackId, trackName, previewUrl, removeSongsFavorite, songs } = this.props;
    const { checked } = target;
    const favoriteSongs = {
      trackId,
      trackName,
      url: previewUrl,
    };
    this.setState({ loading: true });

    console.log(checked, 'test');
    if (checked) {
      await addSong(favoriteSongs);
    } else {
      if (songs) removeSongsFavorite(favoriteSongs);
      await removeSong(favoriteSongs);
    }
    this.setState({ loading: false, isChecked: songs ? this.checkBox(songs) : checked });
  }

  checkBox = (e) => {
    console.log(e);
    const { trackId } = this.props;
    return e.some((item) => item.trackId === trackId);
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;

    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="music-area">
            <p>
              {trackName}
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            </p>
            <section>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favorite"
                  id={ trackId }
                  checked={ isChecked }
                  onChange={ this.checkedButton }
                />
              </label>
            </section>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  previewUrl: PropTypes.string.isRequired,
  removeSongsFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
