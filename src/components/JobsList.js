import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../config.js';

const JobsList = (props) => {
	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		// load the movies when the component is mounted
		fetch(`${APIURL}/jobs`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// Update state with successful movie data
				setJobs(data);
			})
			.catch(() => {
				// Update the state if there was an error
				// so we can give feedback to the user!
				setError(true);
			});
	}, []);

	if (error) {
		return <div>Sorry, there was a problem getting the jobs</div>;
	}

	// Check if we have our movies
	// Display "Loading..." if not
	if (jobs.length === 0) {
		return <div>Loading...</div>;
	}

	// If neither of the if statements ran
	// then we have data and can map over the
	// movies array to display the movies.
	return (
		<ul>
			{jobs.map((job) => (
				<li key={job._id}>
					<Link to={`/jobs/${job._id}`}>{job.title}</Link>
				</li>
			))}
		</ul>
	);
};

export default JobsList;
