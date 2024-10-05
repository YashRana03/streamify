import { useEffect, useState } from "react"
import { searchMedia } from "../api"
import { Link, useLocation } from "react-router-dom"
import Poster from "../components/Poster"
import SearchBar from "../components/SearchBar"


export default function Results() {

    const [results, setResults] = useState()
    const genres = JSON.parse(sessionStorage.getItem("genres"))

    const location  = useLocation() // to trigger a re-render of the results page, 
    // location is used as dependency in useEffect

    const searchQuery = sessionStorage.getItem("searchQuery")
    console.log(searchQuery)

    useEffect(() => {
        async function getShowData() {
            try {
                const data = await searchMedia(searchQuery)
                setResults(data)
            }
            catch (err) {
                console.logI(err)
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

    return (
        <div className="container">
            <div className="movies-container">
                <SearchBar />
                <h2 className='section-name'>Results</h2>

                {resultsEl}
            </div>
        </div>
    )
}