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
  //   this.checkedButton();
  // }

  checkedButton = async () => {
    const { favoriteSongs } = this.state;
    this.setState({ loading: true });
    const favorited = await addSong(favoriteSongs);
    this.setState({ favoriteSongs: favorited });
    this.setState({
      loading: false,
      isChecked: true,
    });
  }

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
