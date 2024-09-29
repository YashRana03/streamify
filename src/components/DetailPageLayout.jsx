import { useEffect, useState } from "react"
import MediaDetails from "../pages/MediaDetails"
import { Outlet, useParams, useLocation } from "react-router-dom"
import { getMovieDetails, getShowDetails, getMovieReviews, getShowReviews } from "../api"


export default function DetailPageLayout() {

    const [mediaDetails, setMediaDetails] = useState()
    const [reviewsData, setReviewsData] = useState()

    const id = useParams().id // getting the id of the movie chosen by the user
    
    const location = useLocation()
    let mediaType = location.state?.data

    console.log(mediaType)
    if (mediaType)  {
        sessionStorage.setItem("mediaType", (mediaType))
    }
    else {
        mediaType = sessionStorage.getItem("mediaType")
        console.log(mediaType)
    }
    
    
    useEffect(() => {
        async function getData() {
            try {
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
            }    
            
        }
        getData()
    }, [id])


return (
        <>
            <MediaDetails mediaDetails={mediaDetails}/>
            <Outlet context={{mediaDetails: mediaDetails, reviewsData}}/>
        </>
    )
}