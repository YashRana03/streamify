import { useState } from "react"

/* eslint-disable react/prop-types */
export default function MoviePoster({media, genre}) {

    const [isShown, setIshown] = useState(false) // Keeps track of whether the movie description is being displayed
    
    const mediaType = media.media_type

    // console.log(genre)
    // console.log(media)
    // triggered when user hovers on the movie icon
    function handleMouseEnter() {
        setIshown(true)
    }

    // triggered when the user moves on from movie icon
    function handleMouseLeave() {
        setIshown(false)
    }

    // if (mediaType != "tv" || mediaType != "movie") return null

    // generating the genre tags displayed on the movie poster description (a max of only 3 is displayed)
    const genreTags = media.genre_ids.map((something, i) => {
        if (i <= 2) {
            // if (mediaType == "tv") {
            //     console.log(genre.genresShows[something])
            // }
            
            return <div className="poster-genre" key={i}>{mediaType == "movie" ? genre.genresMovie[something].slice(0, 100) : genre.genresShows[something]}</div>
        }
    })
    


    return (
        <div className="movie-poster" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img  src={`http://image.tmdb.org/t/p/original${media.poster_path}`} alt="Movie image" style={{transform: isShown ? "scale(1.3)" : ""}}/>
            
            
            {/* Conditionally rendering the description section */}
            {isShown && (
                <div  className="movie-info" >
                    <div className="media-type">{mediaType == "tv" ? "Show" : "Movie"}</div>
                    <h3 className="poster-title">{media?.title || media.name}</h3>
                    <div className="poster-rating--year">
                        <div className="year">{media?.release_date ?  media.release_date.slice(0, 4) : `Since ${media.first_air_date.slice(0, 4)}`}</div>
                        <div className="rating">{`${media?.vote_average}`.slice(0, 3) + " IMDb"}</div>
                    </div>

                    <p className="poster-description">{media.overview.length  > 85 ? `${media.overview.slice(0, 85)}...` : media.overview}</p>
                    <div className="poster-genre-list">
                        {genreTags}
                    </div>
                </div>
             )}

        </div>
    )

}