import { useOutletContext } from "react-router-dom"

export default function Reviews() {
    const {reviewsData: data} = useOutletContext()
    console.log(data)

    if (!data) return <h1>Loading</h1>
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--reviews">
                    <div className="movie-page--review">
                        <img  src="/images/account-pic.svg" alt="user-profile-picture" width="100px" className="movie-page--profile-img"/>
                        <h5>{data[0]?.author}</h5>
                        <p>{data[0]?.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}



// {data: {movieDetails, reviewsData}}