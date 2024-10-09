import { useEffect, useState } from "react"
import { searchMedia } from "../api"
import { Link, useLocation } from "react-router-dom"
import Poster from "../components/Poster"
import SearchBar from "../components/SearchBar"
import { ClipLoader } from "react-spinners"
import Error from "../components/ErrorMessage"


export default function Results() {

    const [results, setResults] = useState() // to store search data
    const genres = JSON.parse(sessionStorage.getItem("genres")) // getting genre data from storage

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const location  = useLocation() // to trigger a re-render of the results page, 
    // location is used as dependency in useEffect

    // getting the search string
    const searchQuery = sessionStorage.getItem("searchQuery")

    useEffect(() => {
        // getting data 
        async function getShowData() {
            try {
                setLoading(true)
                const data = await searchMedia(searchQuery)
                setResults(data)
            }
            catch (err) {
                setError(err)
            }
            finally {
                setLoading(false)
            }

        }
        getShowData()
        
        // When these dependencies change send api request for data again
    }, [searchQuery, location])


    // creating the posters for the movies from the results data
    const resultsEl = results?.map((media, i) => {

        if (media?.media_type != "tv" & media?.media_type != "movie") return null
        return ( 
              <Link key={i} to={`../movie/${media.id}`} state={{data: media?.media_type}}>
                  <Poster 
                  media={media}
                  genre={genres}
                  />
              </Link>
          )
      })

    // display error if data could not be retrieved
    if (error) {
        return <Error error={error} />
    }
    
    // Dispay loading spinner while data is loading
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
    // JSX for results page
    return (
        <div className="container">
            <div className="movies-container">
                <SearchBar />
                <h2 className='section-name'>Results</h2>
                {resultsEl}
                {resultsEl?.length == 0 ? "NO MATCH" : null}
            </div>
        </div>
    )
}