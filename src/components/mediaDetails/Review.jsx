/* eslint-disable react/prop-types */
import { useState } from "react"

// Review component
export default function Review({data}) {

    const [length] = useState(data.content.length) // review text length
    const [show, setShow] = useState()  // flag to show clipped text

    // toggles the show flag
    function toggleShow() {
        setShow(() => !show)
    }

    // JSX for displaying review text, author name, data posted, and a show btn to show the entire text if it was clipped
    return  (
        
        <div className="movie-page--review">
            <img  src="/images/account-pic.svg" alt="user-profile-picture" className="movie-page--profile-img"/>
            <div className="movie-page--createdAt">{`On: ${data?.created_at.slice(0, 10)}`}</div>
            <h5 className="movie-page--author">{data?.author}</h5>
            <p>{show ? data?.content : `${data?.content.slice(0, 300)}...`}</p>
            {length > 300 ? <p onClick={toggleShow} className="movie-page--show-btn">{show ? "Show Less" : "Show More"}</p> : null}
        </div>
        
    )
}