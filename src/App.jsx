import { useEffect, useState } from 'react';
import './App.css'
import Movie from './components/Movie';

function App() {

  const [movieData, setMovieData] = useState(null) // stores movie data
  const [movieGenre, setMovieGenre] = useState(null) // stores the movie genre
  
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

    // obtains the movie genre data
    if (!movieGenre) {
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .then(data =>  {

        // Remodelling the Genre data into look up dictionary for better performance
        const genre = data.genres
        let dict = {}
        for (let i=0; i<genre.length; i++) {
        dict[genre[i].id] = genre[i].name
      
        }
        setMovieGenre(dict)
      })
      .catch(err => console.error(err));
    }


  }, [])

  // Looping over data and creating Movie elements
  const movieEl = movieData?.map((movie, i) => {
    return ( 
    <Movie 
      key={i} 
      movie={movie}
      genres={movieGenre}
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
