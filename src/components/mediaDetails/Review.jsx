/* eslint-disable react/prop-types */
import { useState } from "react"

export default function Review({data}) {

    const [length] = useState(data.content.length)
    const [show, setShow] = useState()    

    function toggleShow() {
        setShow(() => !show)
    }

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