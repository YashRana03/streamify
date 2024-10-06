import { useOutletContext } from "react-router-dom"
import Review from "./Review"
import { useState } from "react"

export default function ReviewsSection() {
    const {reviewsData: data} = useOutletContext()
    const [shownReviews, setShowReviews] = useState(3)

    function showMoreReviews() {
        setShowReviews(prevState => prevState + 3)
    }
    
    if (!data) return <div className="movie-page--container"><h1>Loading</h1></div>

    if (data.length == 0) {
        return (
            <div className="movie-page--container">
                <div className="movie-page--reviews">
                    <h3>No reviews</h3>
                </div>
            </div>
        )
    }

    const reviewEl = data.map((review, i) => {
        return <Review data={review} key={i}/>
        
    })
    
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

