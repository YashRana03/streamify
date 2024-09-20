import { useState, useEffect } from "react"
import MoviePoster from "../components/MoviePoster"
import { getTrendingData, getGenreData, getMovieData, getShowData } from "../api"
import { Link } from "react-router-dom"



export default function Home() {
    const [trendingMediaData, setTrendingMediaData] = useState(null) // stores trending movie/shows data
    const [movieData, setMovieData] = useState(null) // stores movie data
    const [showData, setShowData] = useState() // stores show data
    const [genreData, setGenreData] = useState() // stores both movie and tv show genres
  
    
    useEffect(() => {

        // Making the various api calls to get the required data and set it in the appropriate state
        async function getData() {
            try {
                const [tending, genres, movie, show] = await Promise.all([getTrendingData(), getGenreData(),getMovieData(), getShowData()])
                setTrendingMediaData(tending)
                setGenreData(genres)
                setMovieData(movie)
                setShowData(show)
            }
            catch (err) {
                console.log("Following error occured while fetching data: ",  err)
            }
        
        }
        getData()      

    }, [])
  
    // Looping over data and creating trending movie and show poster elements
    const trendingEl = trendingMediaData?.map((media, i) => {
      return ( 
            <Link key={i} to={`movie/${media.id}`}>
                <MoviePoster 
                media={media}
                genre={genreData}
                />
            </Link>
        )
    })
  
    // Looping over data and creating movie poster elements
    const movieEl = movieData?.map((media, i) => {
        return ( 
            <Link key={i} to={`movie/${media.id}`}>
                <MoviePoster 
                media={media}
                genre={genreData}
                />
            </Link>

        )
    })
  
    // Looping over data and creating show poster elements
    const showEl = showData?.map((media, i) => {
      return ( 
            <Link key={i} to={`movie/${media.id}`}>
                <MoviePoster 
                media={media}
                genre={genreData}
                />
            </Link>
        )
    })
    
    // Making sure all the data necessary is received before returning the JSX for displaying the movie posters
    if (!trendingMediaData || !genreData?.genresMovie || !genreData?.genresShows || !movieData || !showData ) return  <h1>Loading</h1>
  
    return (
      <>
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