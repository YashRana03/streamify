import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Movie({movie, genres}) {

    const [isShown, setIshown] = useState(false) // Keeps track of whether the movie description is being displayed

    // triggered when user hovers on the movie icon
    function handleMouseEnter() {
        setIshown(true)
    }

    // triggered when the user moves on from movie icon
    function handleMouseLeave() {
        setIshown(false)
    }
    console.log(movie.genre_ids)


    // generating the genre tags displayed on the movie poster description (a max of only 3 is displayed)
    const genreTags = movie.genre_ids.map((something, i) => {
        if (i <= 2) {
            return <div className="genre" key={i}>{genres[something]}</div>
        }
    })
    


    return (
        <div className="movie-poster" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img  src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt="Movie image" style={{transform: isShown ? "scale(1.3)" : ""}}/>
            
            {/* Conditionally rendering the description section */}
            {isShown && (
                <div  className="movie-info" >
                    <h3 className="poster-title">{movie.title}</h3>
                    <div className="rating--year">
                        <div className="year">{movie.release_date.slice(0, 4)}</div>
                        <div className="rating">{`${movie.vote_average}`.slice(0, 3) + " IMDb"}</div>
                    </div>

                    <p className="poster-description">{movie.overview.length  > 75 ? `${movie.overview.slice(0, 85)}...` : movie.overview}</p>
                    <div className="genre-list">
                        {genreTags}
                    </div>
                </div>
             )}

        </div>
    )

}