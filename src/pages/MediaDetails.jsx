/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"

export default function MovieDetails({mediaDetails}) {
    const [isLoading, setIsLoading] = useState(true)

    // retrieving the media type in order to access different propeties of mediaDetails object
    const mediaType = sessionStorage.getItem("mediaType") 
    // creating p tags for each genre of the media
    const genres = mediaDetails?.genres.map((genre, i) => <p key={i}>{genre?.name}</p>)

    useEffect(() => {
        window.scrollTo(0, 0); // makes sure user ends up at the top of the page
      }, []);

    if (!mediaDetails) {
        return null
    }

    // JSX containing the background image, title, runtime, genre displayed on the media details page
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--main">
                {isLoading && <div className="skeleton-loader"></div>}
                    {/* img element which conditionally renders the actual movie background img or a black background */}
                    <img src={mediaDetails?.backdrop_path ? `http://image.tmdb.org/t/p/original${mediaDetails.backdrop_path}`: "/images/black-img.png"} onLoad={() => setIsLoading(false)} className="movie-page--img"/>
                    <div className="movie-page--title">
                        
                        {/* Accessing the appropriate propeties (depending on media type) to display title, genre and runtime */}
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
                
                {/* sub sections navbar for pricing, details, related*/}
                <div className="movie-page--nav">
                    <NavLink to="." 
                        end
                        // isActive is used to see the currently selected section and apply appropriate styling
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