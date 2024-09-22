import { useEffect, useState } from "react"
import MovieDetails from "../pages/MovieDetails"
import { Outlet, useParams } from "react-router-dom"
import { getMovieDetails, getReviews } from "../api"


export default function DetailPageLayout() {

    const [movieDetails, setMovieDetails] = useState()
    const [reviewsData, setReviewsData] = useState()
    const id = useParams().id // getting the id of the movie chosen by the user
    
    useEffect(() => {
        async function getData() {
            try {
                const [movieData, reviewsData] = await Promise.all([getMovieDetails(id), getReviews(id)])
                
                setMovieDetails(movieData)
                setReviewsData(reviewsData)
                
            } 
            catch (err) {
                console.log(err)
            }    
            
        }
        getData()
    }, [])


    return (
        <>
            <MovieDetails movieDetails={movieDetails}/>
            <Outlet context={{movieDetails, reviewsData}}/>
        </>
    )
}