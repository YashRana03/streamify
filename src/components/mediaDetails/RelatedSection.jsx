import { getRelatedMovies, getRelatedShows } from "../../api";
import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import Poster from "../Poster";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ClipLoader } from "react-spinners";


export default function RelatedSection() {

    const [relatedMedia, setRelatedMedia] = useState()
    const genres = JSON.parse(sessionStorage.getItem("genres"))
    const { mediaDetails} = useOutletContext()
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const mediaType = sessionStorage.getItem("mediaType")
    console.log(mediaType)



    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 7
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 7
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 7
        }
      };



    useEffect(() => {

        async function getData() {
            
            if (mediaDetails) {
                let stringIds = ""
                let x = 0
                for (let i=0; i<mediaDetails?.genres.length; i++) {
                    if (x <=2) stringIds += `${mediaDetails.genres[i].id},`
                }
                console.log(stringIds)
                
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

    }, [mediaDetails])


    console.log(relatedMedia)

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
    return (
        <div className="movie-page--container">
            <div className="movie-page--related">
                <div className="movie-page--carousel">
                <Carousel 
                    responsive={responsive} 
                    containerClass="carousel-container" 
                    infinite={true}
                    slidesToSlide={3}
                    transitionDuration={1000}
                >
                    {moviePosters}
                </Carousel>
                </div>
            </div>

        </div>
        
      );
}