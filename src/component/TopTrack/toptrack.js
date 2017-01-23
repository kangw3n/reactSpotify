import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router';


class TopTrack extends Component {
  constructor() {
      super();
      this.state = {
          tracks: '',
          artist: ''
      }
  }

  componentWillMount() {
    let tracksUrl = `https://api.spotify.com/v1/artists/${this.props.params.id}/top-tracks?country=TW`;
    let artistUrl = `https://api.spotify.com/v1/artists/${this.props.params.id}`;
    let _this = this;

    axios.get(tracksUrl).then(function(e) {
        _this.setState({
          tracks: e.data.tracks
        })
    });

    axios.get(artistUrl).then(function(e) {
        _this.setState({
          artist: e.data
        })
    })
  }

  msMinute(millseconds) {
    let seconds = Math.floor(millseconds / 1000);
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    let minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    let timeString = '';


    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
    if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    if(minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");

    return timeString;
  }

	render() {
    if (this.state.tracks === '' || this.state.artist === ''){
      return false;
    }
		return (
      <div id="track">
        <header className="album-header">
          <div className="row">
            <div className="col-md-4">

              {this.state.artist.images.length &&
                <div>
                  <img src={this.state.artist.images[0].url} className="album-thumb" alt="" />
                </div>
              }

            </div>
            <div className="col-md-8">
              <h2>{this.state.artist.name}</h2>
              <h4>Follower: {this.state.artist.followers.total}</h4>
              <h5>Popularity: {this.state.artist.popularity}</h5>

              <a href={this.state.artist.external_urls.spotify} target="_blank" className="btn btn-primary">View Artist In Spotify</a>
            </div>
          </div>
        </header>

        <div className="album-tracks">
          <h2>Album Tracks</h2>

          {this.state.tracks.map((track, i)=> {
            return(
              <div className="well" key={i}>
                <div className="row">
                  <div className="col-md-2">
                    <img className="album-thumb" src={track.album.images[0].url} alt="" />
                    <span>{track.album.name}</span>
                    <br />
                    <Link to={'/album/' + track.album.id}> View Album </Link>
                  </div>

                  <div className="col-md-10">
                    <h4>{track.name} </h4>
                    <a href={track.preview_url} target="_blank" className="btn btn-primary">Preview Track</a>
                    <div>
                      {this.msMinute(track.duration_ms)} - 	Popularity: {track.popularity}
                      <br />
                    </div>
                  </div>

                </div>

              </div>
            )
          })}



        </div>


      </div>

		);
	}
}

export default TopTrack;
