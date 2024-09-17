import { useEffect, useState } from 'react';
import './App.css'
import Movie from './components/Movie';

function App() {

  const [movieData, setMovieData] = useState(null) // stores movie data
  
  // Authorization options
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `${import.meta.env.REACT_APP_KEY}` // using environment variable

    }
  };
  
  // Obtains the necessary data from the Movie API 
  useEffect(() => {
    if (!movieData) {
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
      .then(response => response.json())
      .then(data => setMovieData(data.results))
      .catch(err => console.error(err));
    }

  }, [])

  // Looping over data and creating Movie elements
  const movieEl = movieData?.map((movie, i) => {
    return ( 
    <Movie 
      key={i} 
      image={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      title={movie.original_title}
      description={movie.overview}
      />
    )
  })


  if (!movieData) return  <h1>Loading</h1>

  return (
    <>
      <div className="container">
        <div className="movies-container">
          {movieEl}
        </div>
       
        </div>
    </>
  )
}

export default App
