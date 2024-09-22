import { useOutletContext } from "react-router-dom"

export default function Details() {
    const {movieDetails: data} = useOutletContext()

    console.log(data)
    
    if (!data) return <h1>Loading</h1>
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--info">
                    <p className="movie-page--overview">{data.overview}</p>
                    <p><span className="movie-page--grey">Country</span>: &nbsp;{data.production_countries[0]?.name}</p>
                    <p><span className="movie-page--grey">IMBd Rating</span>: &nbsp;{data.vote_average} / 10</p>
                    <p><span className="movie-page--grey">Release Date</span>: &nbsp;{data.release_date}</p>
                    <p><span className="movie-page--grey">Studio</span>: &nbsp;{data.production_companies[0]?.name}</p>
                </div>
            </div>
        </>
    )
}