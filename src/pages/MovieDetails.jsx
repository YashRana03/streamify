/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"

export default function MovieDetails({movieDetails}) {

    const genres = movieDetails?.genres.map((genre, i) => <p key={i}>{genre?.name}</p>)

    if (!movieDetails) {
        return <div className="container"><h1>Loading</h1></div>
    }
    
    return (
        <>
            <div className="movie-page--container">
                <div className="movie-page--main">
                    <img src={`http://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} className="movie-page--img"/>
                    <div className="movie-page--title">
                        <h1>{movieDetails.title}</h1>
                        <div className="movie-page--genre">
                            {genres}
                        </div>
                        <div className="movie-page--runtime">{`${Math.floor(movieDetails.runtime / 60)} hr ${movieDetails.runtime % 60} min`}</div>
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