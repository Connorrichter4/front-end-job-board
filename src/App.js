import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import JobsList from './components/JobsList';
import Job from './components/Job';
import JobCreate from './components/JobCreate';
import JobEdit from './components/MovieEdit';
import JobsHome from './components/JobsHome';

const App = () => (
	<>
		<header>
			<Link to='/'>Home</Link>
			<Link to='/jobs/create'>Create</Link>
			<Link to='/jobs'>All Jobs</Link>
		</header>
		<main>
			<Switch>
				<Route exact path='/' component={JobsHome} />
				<Route exact path='/jobs/create' component={JobCreate} />
				<Route exact path='/jobs' component={JobsList} />
				<Route exact path='/jobs/:id' component={Job} />
				<Route exact path='/jobs/:id/edit' component={JobEdit} />
			</Switch>
		</main>
	</>
);

export default App;
