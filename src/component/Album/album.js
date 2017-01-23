import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Album extends Component {
  constructor() {
      super();
      this.state = {
          album: ''
      }
  }

  componentWillMount() {
      let albumUrl = `https://api.spotify.com/v1/albums/${this.props.params.id}`;
      let _this = this;
      axios.get(albumUrl).then(function(e) {
          _this.setState({
            album: e.data
          })
      })
  }

	render() {
    if (this.state.album === ''){
      return false;
    }
		return (
        <div id="album">
  				<header className="album-header">
  					<div className="row">
  						<div className="col-md-4">

                {this.state.album.images.length &&
    							<div>
    								<img src={this.state.album.images[0].url} className="album-thumb" alt="" />
    							</div>
                }

  						</div>
  						<div className="col-md-8">

                {this.state.album.artists.length &&
    							<h4>
                    {this.state.album.artists.map((artist, i) => {
                      return (
                        <span key={i}>
                          {artist.name}
                        </span>
                      )
                    })}
    							</h4>
                }

  							<h2>{this.state.album.name}</h2>
  							<h5>Release Date: {this.state.album.release_date}</h5>
  							<a href={this.state.album.external_urls.spotify} target="_blank" className="btn btn-primary">View In Spotify</a>
  						</div>
  					</div>
  				</header>

  				<div className="album-tracks">
  					<h2>Album Tracks</h2>

            {this.state.album.tracks.items.map((track, i) => {
              return (
                <div key={i}>
                  <div className="well">
                    <h5>{track.track_number} - <Link to={"/track/" + track.id}> {track.name}</Link></h5>
                    <div>
                      Artists:
                      {track.artists.map((artist, index)=> {
                        return (
                          <span className="spacer" key={index} >
                            <Link to={"/artist/" + artist.id}>
                              {artist.name}
                            </Link>
                          </span>
                        )
                      })}
                    </div>

                    <a href={track.preview_url} target="_blank">Preview Track</a>
                  </div>
                </div>
              )
            })}

  				</div>
  			</div>

		);
	}
}

export default Album;
