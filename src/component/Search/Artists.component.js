import React, { Component } from 'react';
import { Link } from 'react-router';

class Artists extends Component {
	render() {
		return (
			<span className="spacer">
				<Link to={'/artist/' + this.props.data.id}>{this.props.data.name}</Link>
			</span>
		);
	}
}

export default Artists;
