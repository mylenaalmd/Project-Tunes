import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../componentes/MusicCard';

class Album extends React.Component {
  state = {
    choiceAlbum: [],
  }

  componentDidMount() {
    this.selectedAlbum();
  }

  selectedAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);

    if (request !== undefined) {
      request.forEach((e) => {
        this.setState((prevState) => ({
          choiceAlbum: [...prevState.choiceAlbum, e],
        }));
      });
    }
  }

  render() {
    const { choiceAlbum } = this.state;
    console.log(choiceAlbum.length);
    return (
      <div>
        <div data-testid="page-album">
          <Header />
          {choiceAlbum.length > 0 && (
            <div>
              <h1 data-testid="artist-name">{choiceAlbum[0].artistName}</h1>
              <h3 data-testid="album-name">{choiceAlbum[0].collectionName}</h3>
            </div>
          )}
        </div>
        <div>
          <ul>
            {
            //   choiceAlbum.length > 0
            // && (
              choiceAlbum.filter((item) => item.trackId)
                .map((e, index) => (
                  <li key={ index }>
                    <MusicCard
                      trackId={ e.trackId }
                      trackName={ e.trackName }
                      previewUrl={ e.previewUrl }
                      kind={ e.kind }
                    />
                  </li>
                ))
            // )
            }
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
