import { useState, useEffect } from "react"
import Poster from "../components/Poster"
import { getTrendingData, getGenreData, getMovieData, getShowData } from "../api"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { ClipLoader} from "react-spinners"
import Error from "../components/Error"

export default function Home() {
    const [trendingMediaData, setTrendingMediaData] = useState(data("trending")) // stores trending movie/shows data
    const [movieData, setMovieData] = useState(data("movie")) // stores movie data
    const [showData, setShowData] = useState(data("show")) // stores show data
    const [genreData, setGenreData] = useState(data("genres")) // stores both movie and tv show genres
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
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
                setLoading(true)
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
                setError(err)
                console.log("Following error occured while fetching data: ",  err)
            }
            finally {
                setLoading(false)
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
            <Link key={i} to={`movie/${media.id}`} state={{data: media?.media_type}}>
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
            <Link key={i} to={`movie/${media.id}/`} state={{data: "movie"}}>
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
            <Link key={i} to={`movie/${media.id}`} state={{data: "tv"}}>
                <Poster 
                media={media}
                genre={genreData}
                />
            </Link>
        )
    })

    if (error) {
        return <Error error={error} />
    }
    
    // Making sure all the data necessary is received before returning the JSX for displaying the movie posters
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

