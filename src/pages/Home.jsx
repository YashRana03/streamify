import { useState, useEffect } from "react"
import MoviePoster from "../components/MoviePoster"
import { getTrendingData, getGenreData, getMovieData, getShowData } from "../api"
import { Link } from "react-router-dom"



export default function Home() {
    const [trendingMediaData, setTrendingMediaData] = useState(data("trending")) // stores trending movie/shows data
    const [movieData, setMovieData] = useState(data("movie")) // stores movie data
    const [showData, setShowData] = useState(data("show")) // stores show data
    const [genreData, setGenreData] = useState(data("genres")) // stores both movie and tv show genres
  

    // helper function to get data from session storage if it exists
    function data(name) {
        const stringData = sessionStorage.getItem(name)
        if (stringData) return JSON.parse(stringData)
        return null
    }
    
    useEffect(() => {

        // Making the various api calls to get the required data and set it in the appropriate state
        async function getData() {
            try {
                const [trending, genres, movie, show] = await Promise.all([getTrendingData(), getGenreData(),getMovieData(), getShowData()])
                setTrendingMediaData(trending)
                setGenreData(genres)
                setMovieData(movie)
                setShowData(show)

                console.log("API CALLS WERE MADE")
                
                // Storing the data in session Storage so as to limit API calls to be made only when the page is first loaded and not again
                sessionStorage.setItem("trending", JSON.stringify(trending))
                sessionStorage.setItem("genres", JSON.stringify(genres))
                sessionStorage.setItem("movie", JSON.stringify(movie))
                sessionStorage.setItem("show", JSON.stringify(show))
            }
            catch (err) {
                console.log("Following error occured while fetching data: ",  err)
            }
        
        }
        // checking whether the data has been already been obtained (from session storage) or if not make API calls
        if (!movieData || !showData || !genreData || !trendingMediaData)  {
            getData()
        }

    }, [])
  
    // // Looping over data and creating trending movie and show poster elements
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
            <Link key={i} to={`movie/${media.id}/`}>
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
    if (!trendingMediaData || !genreData || !movieData || !showData ) return  <h1>Loading</h1>
  
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