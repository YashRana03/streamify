import { useEffect, useState } from "react"
import MediaDetails from "../../pages/MediaDetails"
import { Outlet, useParams, useLocation } from "react-router-dom"
import { getMovieDetails, getShowDetails, getMovieReviews, getShowReviews } from "../../api"
import { ClipLoader } from "react-spinners"
import Error from "../ErrorMessage"


export default function DetailPageLayout() {

    const [mediaDetails, setMediaDetails] = useState() // movie details data
    const [reviewsData, setReviewsData] = useState() // review data

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const id = useParams().id // getting the id of the movie chosen by the user
    
    const location = useLocation()
    let mediaType = location.state?.data // getting the media type

    // Add the mediaType received to the session storage
    if (mediaType)  {
        sessionStorage.setItem("mediaType", (mediaType))
    }
    // if no mediatype was received due to redirection, access the mediaType in session storage
    else {
        mediaType = sessionStorage.getItem("mediaType")
    }
    
    // Loading data 
    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                if (mediaType == "movie") {
                    const [data, reviewsData] = await Promise.all([getMovieDetails(id), getMovieReviews(id)])
                    
                    setMediaDetails(data)
                    setReviewsData(reviewsData)
                }
                else {
                    const [data, reviewsData] = await Promise.all([getShowDetails(id), getShowReviews(id)])
                    
                    setMediaDetails(data)
                    setReviewsData(reviewsData)
                    
                }
                
            } 
            catch (err) {
                console.log(err)
                setError(err)
            }
            finally {
                setLoading(false)
            }
            
        }
        getData()
    }, [id]) // if id changes request new data


// Error message in case error occurs 
if (error) {
    return <Error error={error}/>
}

// Loading spinner while waiting for data
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

// passing data to MediaDetails component by props, while to the outlet by outletContext
return (
        <>
            <MediaDetails mediaDetails={mediaDetails}/>
            <Outlet context={{mediaDetails: mediaDetails, reviewsData}}/>
        </>
    )
}