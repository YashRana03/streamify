/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css'
import MoviePoster from './components/MoviePoster';

function App() {

  const [mediaData, setMediaData] = useState(null) // stores movie data
  const [genreData, setGenreData] = useState() // stores the movie genre
  
  // Obtains the necessary data from the Movie API 
  useEffect(() => {


    if (!mediaData) {
      fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data => setMediaData(data.results))
      .catch(err => console.error(err));
    }

    // obtains the movie genre data
    if (!genreData) {
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data =>  {

        // Remodelling the Genre data into look up dictionary for better performance
        const genre = data.genres
        let dict = {}
        for (let i=0; i<genre.length; i++) {
        dict[genre[i].id] = genre[i].name
      
        }
        setGenreData(prevState => ({ ...prevState, genresMovie: dict})) 
      })
      .catch(err => console.error(err));

      // obtains the shows genre data
      fetch('https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data =>  {

        // Remodelling the Genre data into look up dictionary for better performance
        const genre = data.genres
        let dict = {}
        for (let i=0; i<genre.length; i++) {
        dict[genre[i].id] = genre[i].name
      
        }
        setGenreData(prevState => ({ ...prevState, genresShows: dict})) // updating the genre object
      })
      .catch(err => console.error(err));

    }
    


    // if (!movieData) {
    //   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=&include_video=true&language=en-US&page=1&sort_by=popularity.desc&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    //   .then(response => response.json())
    //   .then(data => setMovieData(data.results))
    //   .catch(err => console.error(err));
    // }

  }, [])

  // Looping over data and creating Movie elements
  const movieEl = mediaData?.map((media, i) => {
    return ( 
    <MoviePoster 
      key={i} 
      media={media}
      genre={genreData}
      />
    )
  })



  // Making all the data necessary is received before returning the JSX for displaying the movie posters
  if (!mediaData || !genreData?.genresMovie || !genreData?.genresShows ) return  <h1>Loading</h1>

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
