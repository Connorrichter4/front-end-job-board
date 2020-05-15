import React from 'react';

const JobForm = ({ job, handleSubmit, handleChange }) => (
	<form onSubmit={handleSubmit}>
		<label htmlFor='title'>Title</label>
		<input
			placeholder='Job Title'
			value={job.title}
			name='title'
			onChange={handleChange}
			required
			id='title'
		/>

		<label htmlFor='description'>Description</label>
		<input
			placeholder='Description'
			value={job.description}
			name='description'
			onChange={handleChange}
			id='description'
		/>

		<button type='submit'>Submit</button>
	</form>
);

export default JobForm;
