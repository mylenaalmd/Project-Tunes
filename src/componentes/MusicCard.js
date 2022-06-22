import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isChecked: false,
    favoriteSongs: {},
  }

  // componentDidMount = () => {
  //   const getSongs = await getFavoriteSongs();
  //   this.setState({isChecked: this.handleChecked(getSongs)});
  // }

  checkedButton = async () => {
    const { favoriteSongs } = this.state;
    this.setState({ loading: true });
    const favorited = await addSong(favoriteSongs);
    this.setState({ favoriteSongs: favorited });
    this.setState({ loading: false, isChecked: true });
  }

  // handleCheckbox = async ({ target }) => {
  //   const { musicsList } = this.props;
  //   const { checked } = target;
  //   const musicFilter = musicsList.filter((item) => item.trackName === target.name)[0];
  //   if (checked) {
  //     await addSong(musicFilter);
  //     this.setState({ loading: false, checkedBox: checked });
  //     return;
  //   }
  //   await removeSong(musicFilter);
  //   this.setState({ loading: false, checkedBox: checked });
  // }

  handleChecked = () => {
    const { trackId, trackName, previewUrl } = this.props;
    this.setState({
      favoriteSongs: {
        id: trackId,
        name: trackName,
        url: previewUrl,
      } });
    this.checkedButton();
  }

  checkBox = (e) => {
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
              <label htmlFor="favorit">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favorit"
                  id="favorit"
                  checked={ isChecked }
                  onClick={ this.handleChecked }
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
};

export default MusicCard;
