import { useEffect, useState } from "react"
import { getMovieDetails } from "../api" 
import { useParams } from "react-router-dom"


export default function MovieDetails() {

    const [movieDetails, setMovieDetails] = useState()
    const id = useParams().id // getting the id of the movie chosen by the user

    console.log(movieDetails)
    
    useEffect(() => {
        async function getData() {
            try {
                const data = await getMovieDetails(id)
                setMovieDetails(data)
                
            } 
            catch (err) {
                console.log(err)
            }    
            
        }
        getData()
    }, [])

    
    // fetch('https://api.themoviedb.org/3/movie/299536?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));

    // fetch('https://api.themoviedb.org/3/movie/299536/reviews?language=en-US&page=1&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    // .then(response => response.json())
    // .then(response => console.log(response.results[1].content))
    // .catch(err => console.error(err));


    const genres = movieDetails?.genres.map((genre, i) => <p key={i}>{genre?.name}</p>)
    // console.log(movieDetails?.genres)


    if (!movieDetails) {
        return <div className="container"><h1>Loading</h1></div>
    }

    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--main">
                    <img src={`http://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} className="movie-page--img"/>
                    <div className="movie-page--title">
                        <h1>{movieDetails.title}</h1>
                        <div className="movie-page--genre">
                            {genres}
                        </div>
                        <div className="movie-page--runtime">{`${Math.floor(movieDetails.runtime / 60)} hr ${movieDetails.runtime % 60} min`}</div>
                        <button className="movie-page--play-button">Play now</button>
                    </div>
                </div>
                <div className="movie-page--nav">
                    <h3>Details</h3>
                    <h3>Related</h3>
                </div>
            </div>
            
        </>
    )
}