/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css'
import MoviePoster from './components/MoviePoster';
import Navbar from './components/Navbar';

function App() {

  const [trendingMediaData, setTrendingMediaData] = useState(null) // stores trending movie/shows data
  const [movieData, setMovieData] = useState(null) // stores movie data
  const [showData, setShowData] = useState()

  const [genreData, setGenreData] = useState() // stores both movie and tv show genres

  console.log(movieData)
  
  // Obtains the necessary data from the Movie API 
  useEffect(() => {

    // Fetching the trending media data
    if (!trendingMediaData) {
      fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data => setTrendingMediaData(data.results.slice(0, 16)))
      .catch(err => console.error(err));
    }

    // Fetching the genre for both movies and shows
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
    
    // Fetching the movie data
    if (!movieData) {
      fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=3&sort_by=popularity.desc&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data => setMovieData(data.results.slice(0, 16)))
      .catch(err => console.error(err));
    }

    // // Fetching the show data
    if (!showData) {
      fetch('https://api.themoviedb.org/3/tv/top_rated?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=7af7f0da356b6bf29e4f80a35298d70a')
      .then(response => response.json())
      .then(data => setShowData(data.results.slice(0, 16)))
      .catch(err => console.error(err));
    }

  }, [])

  // Looping over data and creating Movie elements
  const trendingEl = trendingMediaData?.map((media, i) => {
    return ( 
    <MoviePoster 
      key={i} 
      media={media}
      genre={genreData}
      />
    )
  })

  const movieEl = movieData?.map((media, i) => {
    return ( 
    <MoviePoster 
      key={i} 
      media={media}
      genre={genreData}
      />
    )
  })

  const showEl = showData?.map((media, i) => {
    return ( 
    <MoviePoster 
      key={i} 
      media={media}
      genre={genreData}
      />
    )
  })

  console.log(showData)



  // Making all the data necessary is received before returning the JSX for displaying the movie posters
  if (!trendingMediaData || !genreData?.genresMovie || !genreData?.genresShows || !movieData || !showData ) return  <h1>Loading</h1>

  return (
    <>
      <Navbar />
      <div className='container'>

        <div className="movies-container">
          <h2 className='section-name'>Trending</h2>
          {trendingEl}
        </div>

        <div className="movies-container">
          <h2 className='section-name'>Movies</h2>
          {movieEl}
        </div>
        
        <div className="movies-container">
          <h2 className='section-name'>Shows</h2>
          {showEl}
        </div>
      </div>


    </>
  )
}

export default App
