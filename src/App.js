import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css'

function App() {
  const [title, setTitle] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.get(`https://www.omdbapi.com/?apikey=e0ca2e4d&t=${title}`)
      .then(response => {
        setMovieData(response.data);
        setError(null);
      })
      .catch(error => {
        setMovieData(null);
        setError(error.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Movie Search</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-2">
      <label htmlFor="title" className="sr-only">
        Enter a movie title:
      </label>
      <div className="flex space-x-2">
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="border border-gray-400 rounded px-2 py-1 w-64"
          placeholder="Enter a movie title"
        />
        <button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white rounded px-4 py-1">
          Submit
        </button>
      </div>
    </form>
    {error && <p className="text-red-600">{error}</p>}
    {movieData && (
      <div className="border border-gray-400 rounded p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">{movieData.Title}</h2>
        <p className="mb-2 ">Year: {movieData.Year}</p>
        <p className="mb-2 ">Runtime: {movieData.Runtime}</p>
        <p className="mb-2 ">Genre: {movieData.Genre}</p>
        <p className="mb-2 ">Director: {movieData.Director}</p>
        <p className="mb-2 ">Actors: {movieData.Actors}</p>
        <p className="mb-2 ">IMDB Rating: {movieData.imdbRating}</p>
        <p className="mb-2 ">Plot: {movieData.Plot}</p>
      </div>
      )}
    </div>
  );
}

export default App;
