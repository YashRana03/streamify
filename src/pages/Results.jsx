import { useEffect, useState } from "react"
import { searchMedia } from "../api"
import { Link } from "react-router-dom"
import Poster from "../components/Poster"


export default function Results() {

    const [results, setResults] = useState()
    const genres = JSON.parse(sessionStorage.getItem("genres"))

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
    }, [searchQuery])

    console.log(results)

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
                <h2 className='section-name'>Results</h2>

                {resultsEl}
            </div>
        </div>
    )
}