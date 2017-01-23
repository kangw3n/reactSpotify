import React, { Component } from 'react';
import Navigation from '../Navigation/navigation';


class App extends Component {
  render() {
    return (
      <div className="app">
				<Navigation></Navigation>
				<div className="main">
					<div className="container">
						{this.props.children}
					</div>
				</div>
      </div>
    );
  }
}

export default App;
