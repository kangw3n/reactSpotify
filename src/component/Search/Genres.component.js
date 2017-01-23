import React, { Component } from 'react';

class Genres extends Component {
	render() {
		return (
			<span className="spacer">{this.props.genres}</span>
		);
	}
}

export default Genres;
