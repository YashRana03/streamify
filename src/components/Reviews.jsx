import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"

export default function Reviews() {
    const {reviewsData: data} = useOutletContext()
    const [length, setLength] = useState()
    const [show, setShow] = useState()

    function toggleShow() {
        setShow(() => !show)
    }
    
    useEffect(() => {
        console.log(data)
        if (data) setLength(data.length ? data[0].content.length : 0)
    }, [data])
    
    console.log(data)
    
    if (!data) return <div className="movie-page--container"><h1>Loading</h1></div>

    
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--reviews">
                    {data.length == 0 ? <h3>No reviews</h3> :
                        <div className="movie-page--review">
                            <img  src="/images/account-pic.svg" alt="user-profile-picture" width="100px" className="movie-page--profile-img"/>
                            <div className="movie-page--createdAt">{`On: ${data[0]?.created_at.slice(0, 10)}`}</div>
                            <h5 className="movie-page--author">{data[0]?.author}</h5>
                            <p>{show ? data[0]?.content : data[0]?.content.slice(0, 300)}</p>
                            {length > 300 ? <p onClick={toggleShow} className="movie-page--show-btn">{show ? "Show Less" : "Show More"}</p> : null}
                        </div>
                    }
                    
                </div>
            </div>
        </>
    )
}



// {data: {movieDetails, reviewsData}}