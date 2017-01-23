import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Track extends Component {
    constructor() {
        super();
        this.state = {
            track: ''
        }
    }

    componentWillMount() {
        let trackurl = `https://api.spotify.com/v1/tracks/${this.props.params.id}`;
        let _this = this;
        axios.get(trackurl).then(function(e) {
            _this.setState({track: e.data})
        })
    }

    render() {
        if (this.state.track === ''){
          return false;
        }
        return (
            <div>

                {this.state.track &&
                    <div id="single">
                      <header className="album-header">
                        <div className="row">
                          <div className="col-md-4">

                            {this.state.track.album.images.length &&
                              <div>
                                <img src={this.state.track.album.images[0].url} className="album-thumb" alt="" />
                              </div>
                            }

                          </div>
                          <div className="col-md-8">

                            {(this.state.track.artists.length) &&
                              <h4>
                                {this.state.track.artists.map((artist, i) => {
                                  return (
                                    <span className="spacer" key={i}>
                                      <Link to={'/artist/' + artist.id}>{artist.name}</Link>
                                    </span>
                                  )
                                })}
                              </h4>
                            }

                            <h2>{this.state.track.name}</h2>
                            <h5>Album Name: <Link to={'/album/' + this.state.track.album.id}>{this.state.track.album.name}</Link></h5>
                            <a href={this.state.track.external_urls.spotify} target="_blank" className="btn btn-primary">View In Spotify</a>
                          </div>
                        </div>
                      </header>
                    </div>
                  }

            </div>
        );
    }
}

export default Track;
