import { useEffect, useState } from "react"
import { searchMedia } from "../api"
import { Link, useLocation } from "react-router-dom"
import Poster from "../components/Poster"
import SearchBar from "../components/SearchBar"
import { ClipLoader } from "react-spinners"


export default function Results() {

    const [results, setResults] = useState()
    const genres = JSON.parse(sessionStorage.getItem("genres"))

    const [loading, setLoading] = useState(false)

    const location  = useLocation() // to trigger a re-render of the results page, 
    // location is used as dependency in useEffect

    const searchQuery = sessionStorage.getItem("searchQuery")
    console.log(searchQuery)

    useEffect(() => {
        async function getShowData() {
            try {
                setLoading(true)
                const data = await searchMedia(searchQuery)
                setResults(data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }

        }
        getShowData()
    }, [searchQuery, location])


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