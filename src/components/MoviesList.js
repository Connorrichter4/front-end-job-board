import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../config.js';

const MoviesList = props => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // load the movies when the component is mounted
    fetch(`${APIURL}/movies`)
      .then(response => response.json())
      .then(data => {
        // Update state with successful movie data
        setMovies(data);
      })
      .catch(() => {
        // Update the state if there was an error
        // so we can give feedback to the user!
        setError(true);
      });
  }, []);

  if (error) {
    return <div>Sorry, there was a problem getting the movies</div>;
  }

  // Check if we have our movies
  // Display "Loading..." if not
  if (movies.length === 0) {
    return <div>Loading...</div>;
  }

  // If neither of the if statements ran
  // then we have data and can map over the
  // movies array to display the movies.
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie._id}>
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
