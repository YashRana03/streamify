import { useOutletContext } from "react-router-dom"
import Review from "./Review"
import { useState } from "react"

export default function ReviewsSection() {
    const {reviewsData: data} = useOutletContext() // review data received through outletContext
    const [shownReviews, setShowReviews] = useState(3) // number of shows currently being displayed, initialised to be 3

    // increments the shownReviews by 3 
    function showMoreReviews() {
        setShowReviews(prevState => prevState + 3)
    }
    
    // Loading
    if (!data) return <div className="movie-page--container"><h1>Loading</h1></div>

    // In case there are no reviews
    if (data.length == 0) {
        return (
            <div className="movie-page--container">
                <div className="movie-page--reviews">
                    <h3>No reviews</h3>
                </div>
            </div>
        )
    }

    // Creating the individual reviews
    const reviewEl = data.map((review, i) => {
        return <Review data={review} key={i}/>
        
    })
    
    // JSX for review section, initially displaying only 3 reviews, but this increases as user requests for more
    // by making use of the more reviews arrow
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--reviews">
                    {reviewEl.slice(0, shownReviews)}   
                </div>
                {shownReviews < data.length ? 
                    (
                    <div className="movie-page--more-reviews" onClick={showMoreReviews}>
                        <p>More Reviews</p>
                        <img src="/images/down-arrow.svg" width="30px"/>
                    </div>
                    )
                    : null
                }
                
            </div>
        </>
    )
}

