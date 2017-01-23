import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './component/App/app';
import Search from './component/Search/search';
import Artist from './component/Artist/artist';
import Track from './component/Track/track';
import Album from './component/Album/album';
import TopTrack from './component/TopTrack/toptrack';
import About from './component/About/about';

import './index.css';



ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Search}></IndexRoute>
			<Route path="about" component={About}/>
			<Route path="artist/:id" component={Artist} />
			<Route path="track/:id" component={Track} />
			<Route path="album/:id" component={Album} />
			<Route path="top-tracks/:id" component={TopTrack} />
		</Route>
	</Router>,
  document.getElementById('root')
);
