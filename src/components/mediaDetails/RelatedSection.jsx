import { getRelatedMovies, getRelatedShows } from "../../api";
import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Poster from "../Poster";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ClipLoader } from "react-spinners";

// This component is used to craete Related section on the media details page
export default function RelatedSection() {

    const [relatedMedia, setRelatedMedia] = useState() // related data 
    const genres = JSON.parse(sessionStorage.getItem("genres")) // genres for decoding the genre codes into words
    const { mediaDetails} = useOutletContext() // getting media details by outletContext
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const mediaType = sessionStorage.getItem("mediaType") // media type from session storage

    // Responsive rules for the carousel
    const responsive = {
        size1: {
          breakpoint: { max: 3000, min: 1024 },
          items: 7
        },
        size2: {
          breakpoint: { max: 1600, min: 464 },
          items: 5
        },
        size3: {
          breakpoint: { max: 1100, min: 0 },
          items: 4
        },
        size4: {
          breakpoint: { max: 650, min: 0 },
          items: 3,
          slidesToSlide: 3,
        },
        size5: {
            breakpoint: { max: 475, min: 0 },
            items: 2,
            slidesToSlide: 2,
          },
      };


    // Loading related media data
    useEffect(() => {

        async function getData() {
            
            // here the first couple of genre tags are extracted from the media details and concatenated into a string with commas
            if (mediaDetails) {
                let stringIds = ""
                for (let i=0; i<mediaDetails?.genres.length; i++) {
                    if (i <=1) stringIds += `${mediaDetails.genres[i].id},`
                }
                
                // Related media is found by searching for media with similar genre tags
                try {
                    setLoading(true)
                    if (mediaType == "movie") {
                        const data = await getRelatedMovies(stringIds)
                        setRelatedMedia(data)
                    }
                    else {
                        const data = await getRelatedShows(stringIds)
                        setRelatedMedia(data)
                    }
                }
                catch (err) {
                    setError(err)
                    console.log(err)
                }
                finally {
                    setLoading(false)
                }
            }
        }
        getData()

    }, [mediaDetails]) // Data is reloaded every time the media details change

    // Generating the posters of the related media
    const moviePosters = relatedMedia?.map((movie, i) => {
        if (movie?.id == mediaDetails?.id) return null
        return (
            <Link key={i} to={`/movie/${movie.id}`}>
                <Poster 
                media={movie}
                genre={genres}
                scales={false}
                />
            </Link>
        )
        
    })


    // Error message
    if(error) {
        return (
            <div className="movie-page--container">
                <div className="movie-page--error">
                    <div className="error-content">
                    <i className="fa-solid fa-circle-exclamation error-icon"></i>
                    <h3>{error.status}</h3>
                    <p>{error.message}</p>
                    </div>
                </div>
            </div>
        )
    }  

    // Loading spinner
    if (loading) return (
        <div className="movie-page--container">
            <div className="movie-page--related-loading">
                <ClipLoader
                className="bb"
                color={"white"}
                size={70}
                />
            </div>
        </div>
    )

    // JSX for carousel containing the related media3
    return (
        <div className="movie-page--container">
            <div className="movie-page--related">
                <div className="movie-page--carousel">
                {relatedMedia?.length <= 1? "No related media" : 
                    <Carousel 
                        responsive={responsive} 
                        containerClass="carousel-container" 
                        infinite={true}
                        slidesToSlide={3}
                        transitionDuration={1000}
                    >
                        {moviePosters}
                    </Carousel>
}                  
                </div>
            </div>

        </div>
        
      );
}