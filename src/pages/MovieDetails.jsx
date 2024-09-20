import { useEffect, useState } from "react"
import { getMovieDetails } from "../api" 
import { useParams } from "react-router-dom"


export default function MovieDetails() {

    const [movieDetails, setMovieDetails] = useState()
    const genres  = JSON.parse(sessionStorage.getItem("genres")) // getting the genres data from session storage
    const id = useParams().id // getting the id of the movie chosen by the user

    console.log(movieDetails)
    console.log(genres)
    
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
                        <div className="genre"></div>
                    </div>
                </div>
            </div>
            
        </>
    )
}