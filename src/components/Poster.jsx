/* eslint-disable react/prop-types */
import { useState } from "react"

// Poster component used to create the media posters
export default function Poster({media, genre, scales = true}) {

    const [isShown, setIshown] = useState(false) // Keeps track of whether the movie description is being displayed
    
    // Checking if the media received is a movie or show
    const mediaType = media?.media_type ? media.media_type 
    : media?.release_date ? "movie" : "tv"


    // triggered when user first hovers on the movie icon
    function handleMouseEnter() {
        if (scales) setIshown(true)
    }

    // triggered when the user moves on from movie icon
    function handleMouseLeave() {
        if (scales) setIshown(false)
    }

    

    // generating the genre tags displayed on the movie poster description (a max of only 3 is displayed)
    const genreTags = media.genre_ids.map((something, i) => {
        if (i <= 2) {
            return <div className="poster-genre" key={i}>{mediaType == "movie" ? genre?.genresMovie[something] : genre?.genresShows[something]}</div>
        }
    })

    
    if (mediaType == "tv" || mediaType == "movie")  {
        return (
            <div className={`movie-poster ${!scales ? "hover-grey" : null}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                <img  src={media?.poster_path ? `https://image.tmdb.org/t/p/original${media.poster_path}` : "/images/black-img.png"} loading="lazy" alt="Movie image" style={{transform: isShown ? "scale(1.3)" : ""}}/>
                {/* If the media received does not have a poster img display a black background in its place */}
                {!media?.poster_path ? <p className="missing-poster-img">Image Unavailable</p> : null}
                
                {/* Conditionally rendering the description section */}
                {isShown && (
                    <div  className="movie-info" >
                        <div className="media-type">{mediaType == "tv" ? "Show" : "Movie"}</div>
                        
                        {/* Checking media type and displaying the name by accessing the appropriate property, clipping applied if necessary*/}
                        <h3 className="poster-title">{
                            mediaType == "tv" ?
                            media?.name.length > 40 ? `${media?.name.slice(0, 40)}...` : media.name
                            : media?.title.length > 40 ? `${media?.title.slice(0, 40)}...` : media.title
                            }
                        </h3>

                        {/* displaying year and runtime */}
                        <div className="poster-rating--year">
                            <div className="year">{mediaType == "movie" ?  media.release_date.slice(0, 4) : ` ${media.first_air_date.slice(0, 4)}`}</div>
                            <div className="rating">{media?.vote_average == 0 ? "N/A" : `${media?.vote_average}`.slice(0, 3) + " IMDb"}</div>
                        </div>
    
                        {/* Displaying the clipped overview */}
                        <p className="poster-description">{media.overview.length  > 85 ? `${media.overview.slice(0, 85)}...` : media.overview}</p>
                        
                        {/* Genre Tags */}
                        <div className="poster-genre-list">
                            {genreTags}
                        </div>
                    </div>
                 )}
    
            </div>
        )
    }

}