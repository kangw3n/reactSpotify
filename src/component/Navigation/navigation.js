import React, { Component } from 'react';
import { Link, IndexLink  } from 'react-router';
import NavLink from './NavLink';

class Search extends Component {
	render() {
		return (
			<nav className="navbar navbar-inverse">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/" >reactSpotify</Link>
					</div>
					<div id="navbar" className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
							<li><NavLink to="/about" activeClassName="active">About</NavLink></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}

export default Search;
