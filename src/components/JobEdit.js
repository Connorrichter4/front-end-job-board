import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';
import JobForm from './JobForm.js';

const JobEdit = ({ match }) => {
	const [job, setJob] = useState(null);
	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);

	useEffect(() => {
		const url = `${APIURL}/jobs/${match.params.id}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setJob({ description: data.description, title: data.title });
			})
			.catch(() => {
				// Update the state if there was an error
				// so we can give feedback to the user!
				setError(true);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event) => {
		// Every time the user types or pastes something
		// inside an input field in the form, the onChange
		// event listener is fired and calls handleChange.
		// In React, when we want to use the event asynchronously
		// we should call event.persist().  Learn more here:
		// https://reactjs.org/docs/events.html#event-pooling
		event.persist();
		// We'll get the value from the input that was changed
		// using event.target.value.
		// We'll use the name of the input to find out which
		// property in our state object to update using
		// event.target.name.  MAKE SURE THE INPUT HAS A NAME
		// and the name matches the property name in the object
		// exactly.
		// With the spread operator (watch this great video if
		// you're not really clear on how spread works:
		// https://www.youtube.com/watch?v=pYI-UuZVtHI) we can
		// spread the current movies properties and values into
		// the new state object and then we override the one
		// with the changed value.
		setJob({
			...job,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/jobs/${match.params.id}`;

		fetch(url, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYmYwNzY5ZTc2NmQ2YzY3MTk5NmIyNiIsImlhdCI6MTU4OTU3ODU1OCwiZXhwIjoxNTg5NjE0NTU4fQ.bQ4hJw16LplhbHhMXo4-mWFM4vEoQOzM-KkYLrCtRpc',
			},
			body: JSON.stringify(job),
		})
			.then((response) => response.json())
			// We're going to update state so there's a re-render
			// By setting updated to true, we use this value to
			// render a Redirect component from react-router-dom
			// and take the user back to the "show" route which will
			// display the newly updated movie.
			.then((data) => {
				setCreatedId(data._id);
			})
			.catch(() => {
				// Update the state if there was an error
				// so we can give feedback to the user!
				setError(true);
			});
	};

	if (createdId) {
		return <Redirect to={`/jobs/${createdId}`} />;
	}
	return (
		<>
			<h3>Update Job</h3>
			{error && <p>Something went wrong... Please try again!</p>}
			{job && (
				<JobForm
					job={job}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			)}
		</>
	);
};

export default JobEdit;
