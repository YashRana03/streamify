import { useOutletContext } from "react-router-dom"

export default function DetailsSection() {

    const {mediaDetails: data} = useOutletContext() // receiving media details through outlet context

    const mediaType = sessionStorage.getItem("mediaType") // accessing media type

    if (!data) return null

    // JSX for displaying overview, country, rating, year, company by accessing the appropriate propeties based on the media type
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--info">
                    <p className="movie-page--overview">{data.overview}</p>
                    <p><span className="movie-page--grey">Country</span>: &nbsp;{data.origin_country}</p>
                    <p><span className="movie-page--grey">IMBd Rating</span>: &nbsp;{data?.vote_average == 0 ? "N/A" : `${data?.vote_average}`.slice(0, 3) + " / 10"}</p>
                    <p><span className="movie-page--grey">{mediaType == "tv" ?  "First Aired" : "Release Date"}</span>
                        : &nbsp;{mediaType == "tv" ? data.first_air_date : data.release_date }
                    </p>
                    <p><span className="movie-page--grey">Studio</span>: &nbsp;{data.production_companies[0]?.name}</p>
                </div>
            </div>
        </>
    )
}