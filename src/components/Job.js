import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';

const Job = ({ match }) => {
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);
	const [job, setJob] = useState(null);

	useEffect(() => {
		const url = `${APIURL}/jobs/${match.params.id}`;
		fetch(url)
			.then((response) => response.json())
			.then(setJob)
			.catch(() => {
				// Update the state if there was an error
				// so we can give feedback to the user!
				setError(true);
			});
	}, [match.params.id]);

	const onDeleteJob = (event) => {
		const url = `${APIURL}/jobs/${match.params.id}`;
		fetch(url, {
			method: 'DELETE',
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYmYwNzY5ZTc2NmQ2YzY3MTk5NmIyNiIsImlhdCI6MTU4OTU3ODU1OCwiZXhwIjoxNTg5NjE0NTU4fQ.bQ4hJw16LplhbHhMXo4-mWFM4vEoQOzM-KkYLrCtRpc',
			},
		})
			.then((res) => {
				setDeleted(true);
			})
			.catch(console.error);
	};
	// If we deleted the movie, redirect back to the movies list
	if (deleted) {
		return <Redirect to='/jobs' />;
	}

	// Check if there was an error
	// If there is give the user feedback!
	if (error) {
		return <div>Sorry, there was a problem getting the jobs</div>;
	}

	// Check if we have our movies
	// Display "Loading..." if not
	if (!job) {
		return <div>Loading...</div>;
	}

	// If none of the if statements ran
	return (
		<div>
			<h3>Title: {job.title}</h3>
			<p>Description: {job.description}</p>
			<button onClick={onDeleteJob}>Delete Job</button>
			<Link to={`/jobs/${match.params.id}/edit`}>Update Job</Link>
		</div>
	);
};

export default Job;
