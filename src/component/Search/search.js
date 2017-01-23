import React, {Component} from "react";
import {Link} from "react-router";
import Genres from './Genres.component';
import Artists from './Artists.component';
import axios from 'axios';
import _ from 'lodash';

let state = {
    searchStr: '',
    songs: [],
    queryType: 'track',
    errorMsg: ''
};

class Search extends Component {
    constructor() {
        super();
        this.state = state

    }

    componentWillUnmount() {
      // store state
      //state = this.state;
    }

    static defaultProps = {
        types: ['track', 'album', 'artist']
    }

    searchString = _.debounce(function() {
      if (this.refs.searchStr.value.trim() === '') {
        this.setState({
          errorMsg: 'No input found',
          songs: []
        });
        return false;
      }
        this.setState({
          searchString: this.refs.searchStr.value
        }, function() {
          this.searchMusic();
        });


    }, 1000)

    searchMusic = function() {
        let getSongUrl = `https://api.spotify.com/v1/search?query=${this.state.searchString}&offset=0&limit=20&type=${this.state.queryType}&market=TW`;
        let _this = this;
        axios.get(getSongUrl).then(function(res) {
            _this.setState({
                songs: res.data[_this.state.queryType + 's'].items
            }, function() {
              console.log(_this.state.songs);
              if (_this.state.songs.length === 0) {
                _this.setState({
                  errorMsg: 'No Result Found!'
                });
              } else {
                _this.setState({
                  errorMsg: ''
                })
              }
            })
        })

    }

    changeType() {
        this.setState({
          queryType: this.refs.queryOption.value
        }, function() {
          console.log(this.state.searchString);
          if (typeof this.state.searchString !== 'undefined') {
            this.searchMusic();
          } 
        });
    }

    preventDefault() {}

    render() {
        let queryOption = this.props.types.map(type => {
            return <option key={type} value={type}>{type}</option>
        });

        return (
            <div className="search">
                <h1>Need Music?</h1>
                <div className="lead">
                    Use Spotify to listen music!
                </div>

                <form onSubmit={this.preventDefault.bind(this)}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search Music..." ref="searchStr" name="searchStr" onKeyUp={this.searchString.bind(this)}/>
                    </div>

                    <select ref="queryOption" onChange={this.changeType.bind(this)}>
                        {queryOption}
                    </select>

                </form>

                {this.state.songs &&
                  this.state.songs.map((res, i) => {

                      return (
                          <div className="row" key={i}>
                              <div className="col-md-12">
                                  <div className="search-res well">
                                      <h4><Link to={'/' + this.state.queryType + '/' + res.id}>{res.name}</Link></h4>

                                      {res.genres &&
                                        <div className="genres-type">
                                          <strong>Genres:</strong>
                                          {res.genres.map((genre, i) => {
                                            return <Genres key={i} genres={genre}></Genres>
                                          })}
                                        </div>
                                      }

                                      {res.artists &&
                                        <div className="artists-type">
                                          <strong>Artists: </strong>
                                          {res.artists.map((artist, i) => {
                                            return  <Artists key={i} data={artist}></Artists>
                                          })}
                                        </div>
                                      }

                                      {res.album &&
                                        <div className="album-holder">
                                            <strong>Album:
                                            </strong>
                                            <span className="spacer">
                                                <Link to={'/album/' + res.album.id}>{res.album.name}</Link>
                                            </span>
                                        </div>
                                      }

                                  </div>
                              </div>
                          </div>
                      )
                  })

                }

                {this.state.errorMsg !== '' &&
                  <h1>Error Occurs: {this.state.errorMsg}</h1>
                }
            </div>
        );
    }
}

export default Search;
