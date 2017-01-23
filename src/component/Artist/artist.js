import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {Link} from 'react-router';


class Artist extends Component {
  constructor() {
      super();
      this.state = {
          albums: '',
          artist: '',
          errorMsg: '',
          filterString: '',
          filterArray: []
      }
  }

  componentWillMount() {
      let albumUrl = `https://api.spotify.com/v1/artists/${this.props.params.id}/albums`;
      let artistUrl = `https://api.spotify.com/v1/artists/${this.props.params.id}`;
      let _this = this;

      axios.get(albumUrl).then(function(e) {
          _this.setState({
            albums: e.data.items,
            filterArray: e.data.items
          })
      });

      axios.get(artistUrl).then(function(e) {
          _this.setState({
            artist: e.data
          })
      });
  }

  getViewableEls (elements, filterStr) {
    return elements.filter(el => {
      return (el.name.includes(filterStr));
    })
  }

  changed = _.debounce(function(e) {
    this.setState({
      filterString: this.refs.filter.value.trim(),
      filterArray: this.getViewableEls(this.state.albums, this.refs.filter.value.trim())
    }, function() {
      console.log(this.state.filterArray);
    })
  }, 1000)

	render() {
    if (this.state.albums === '' || this.state.artist === ''){
      return false;
    }

		return (
			<div className="">
        <header className="artist-header clearfix">
          <h1>

            {this.state.artist.images.length &&
              <span>
                <img src={this.state.artist.images[0].url} className="artist-thumb img-circle" alt="" />
              </span>
            }

            {this.state.artist.name}
          </h1>

          {this.state.artist.genres.length &&
            <p>
              Genres:
              {this.state.artist.genres.map((genres, i) => {
                return (
                  <span className="spacer" key={i}>
                    {genres}
                  </span>
                )
              })}
            </p>
          }


          <div className="col-md-3">
            <Link to={"/top-tracks/" + this.state.artist.id} className="btn btn-success">View all Tracks</Link>
          </div>
        </header>

        <form id="albumFilter">
          <div className="form-group">
            <label className="control-label" htmlFor="inputDefault">Filter Album</label>
            <input type="text" name="albumFilter" className="form-control" id="inputDefault" ref="filter" onKeyUp={this.changed.bind(this)} />
          </div>
        </form>

        <div className="artist-albums">
          <div className="row flexy">

            {this.state.filterArray.map((album, i) => {
              return(
                <div className="col-md-3 well" key={i}>

                  {album.images.length &&
                    <div className="album">
                      <img className="album-thumb img-thumbnail" src={album.images[0].url} alt="" />
                      <h4>{album.name}</h4>
                      <Link to={"/album/" + album.id} className="btn btn-default btn-block">Album Details</Link>

                    </div>
                  }
                </div>
              )

            })}



          </div>
        </div>


			</div>
		);
	}
}

export default Artist;
