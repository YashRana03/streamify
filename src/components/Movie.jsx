import { useState } from "react"

/* eslint-disable react/prop-types */
export default function Movie({image, title, description}) {

    const [isShown, setIshown] = useState(false) // Keeps track of whether the movie description is being displayed

    // triggered when user hovers on the movie icon
    function handleMouseEnter() {
        setIshown(true)
    }

    // triggered when the user moves on from movie icon
    function handleMouseLeave() {
        setIshown(false)
    }

    return (
        <div className="movie-img" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img  src={image} alt="Movie image"/>
            
            {/* Conditionally rendering the description section */}
            {isShown && (
                <div  className="movie-description" >
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
             )}

        </div>
    )

}