/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { useState } from "react"

export default function MovieDetails({mediaDetails}) {
    const [isLoading, setIsLoading] = useState(true)


    const mediaType = sessionStorage.getItem("mediaType")
    const genres = mediaDetails?.genres.map((genre, i) => <p key={i}>{genre?.name}</p>)

    if (!mediaDetails) {
        return null
    }

    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--main">
                {isLoading && <div className="skeleton-loader"></div>}
                    <img src={mediaDetails?.backdrop_path ? `http://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`: "/images/black-img.png"} onLoad={() => setIsLoading(false)} className="movie-page--img"/>
                    <div className="movie-page--title">
                        <h1>{mediaType == "tv" ? mediaDetails.name : mediaDetails.title}</h1>
                        <div className="movie-page--genre">
                            {genres}
                        </div>
                        <div className="movie-page--runtime">
                            {   mediaType == "tv" ?
                                `Season ${mediaDetails.number_of_seasons}`
                                :
                                mediaDetails.runtime != 0 ? 
                                `${Math.floor(mediaDetails.runtime / 60)} hr ${mediaDetails.runtime % 60} min`:
                                null
                                
                            }
                        </div>
                        <button className="movie-page--play-button">Play now</button>
                    </div>
                </div>
                <div className="movie-page--nav">
                    <NavLink to="." 
                        end  
                        className={({isActive}) => isActive ? "active" : null}>
                        <h3>Details</h3>
                    </NavLink>
                    <NavLink to="related" 
                    
                        className={({isActive}) => isActive ? "active" : null}>
                        <h3>Related</h3>
                    </NavLink>
                    <NavLink to="reviews" 
                    
                    className={({isActive}) => isActive ? "active" : null}>
                    <h3>Reviews</h3>
                </NavLink>
                </div>
            </div>
            
        </>
    )
}