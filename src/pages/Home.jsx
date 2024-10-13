import { useState, useEffect } from "react"
import Poster from "../components/Poster"
import { getTrendingData, getGenreData, getMovieData, getShowData } from "../api"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { ClipLoader} from "react-spinners"
import Error from "../components/ErrorMessage"


export default function Home() {
    const [trendingMediaData, setTrendingMediaData] = useState(data("trending")) // stores trending movie/shows data
    const [movieData, setMovieData] = useState(data("movie")) // stores movie data
    const [showData, setShowData] = useState(data("show")) // stores show data
    const [genreData, setGenreData] = useState(data("genres")) // stores both movie and tv show genres
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    // To change the number of posters being displayed based on the user's viewport width
    const [width] = useState(window.innerWidth)
    const [numberOfItems] = useState(numItems())
    
    // helper function to get data from session storage if it exists
    function data(name) {
        const stringData = sessionStorage.getItem(name)
        if (stringData) return JSON.parse(stringData)
        return null
    }

    // helper function to set number of poster to display
    function numItems() {
        if (width <= 400) return(6)
        else if (width <= 700) return(8)
        else if (width <= 1000) return(10)
        else return 14
    }

    useEffect(() => {


        // Making the various api calls to get the required data and set it in the appropriate state
        async function getData() {

            try {
                setLoading(true)
                const [trending, genres, movie, show] = await Promise.all([getTrendingData(numberOfItems), getGenreData(numberOfItems),getMovieData(numberOfItems), getShowData(numberOfItems)])
                setTrendingMediaData(trending)
                setGenreData(genres)
                setMovieData(movie)
                setShowData(show)
                
                // Storing the data in session Storage so as to limit API calls to be made only when the page is first loaded and not again
                sessionStorage.setItem("trending", JSON.stringify(trending))
                sessionStorage.setItem("genres", JSON.stringify(genres))
                sessionStorage.setItem("movie", JSON.stringify(movie))
                sessionStorage.setItem("show", JSON.stringify(show))
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)
            }
        
        }
        // checking whether the data has been already been obtained (from session storage) or if not make API calls
        if (!movieData)  {
            getData()
        }

    }, [])
  
    // // Looping over data and creating trending movie and show poster elements
    const trendingEl = trendingMediaData?.map((media, i) => {
      return ( 
            <Link key={i} to={`details/${media.id}/${media?.media_type}`} state={{data: media?.media_type}}>
                <Poster 
                media={media}
                genre={genreData}
                
                />
            </Link>
        )
    })
  
    // Looping over data and creating movie poster elements
    const movieEl = movieData?.map((media, i) => {
        return ( 
            <Link key={i} to={`details/${media.id}/movie`} state={{data: "movie"}}>
                <Poster 
                media={media}
                genre={genreData}
                />
            </Link>

        )
    })
  
    // Looping over data and creating show poster elements
    const showEl = showData?.map((media, i) => {
      return ( 
            <Link key={i} to={`details/${media.id}/tv`} state={{data: "tv"}}>
                <Poster 
                media={media}
                genre={genreData}
                />
            </Link>
        )
    })

    // In case data could not be retrieved successfully, display error message
    if (error) {
        return <Error error={error} />
    }
    
    // display the loading spinner while the data is loading
    if (loading) {
        return  (
            <div className="loading-container">
                <ClipLoader
                color={"white"}
                size={70}
                />
            </div>
        )
    }
  
    // JSX for home page
    return (
      <>
        <div className='container'>
            
            <div className="movies-container">
                <SearchBar />
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
