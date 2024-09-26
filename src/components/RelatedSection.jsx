import { getRelatedMovies } from "../api";
import { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import MoviePoster from "./MoviePoster";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


export default function RelatedSection() {

    const [relatedMovies, setRelatedMovies] = useState()
    const genres = JSON.parse(sessionStorage.getItem("genres"))
    const {movieDetails} = useOutletContext()

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
            
            if (movieDetails) {
                let stringIds = ""
                let x = 0
                for (let i=0; i<movieDetails?.genres.length; i++) {
                    if (x <=2) stringIds += `${movieDetails.genres[i].id},`
                }
                console.log(stringIds)
                
                try {
                    const data = await getRelatedMovies(stringIds)
                    setRelatedMovies(data)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }
        getData()

    }, [movieDetails])


    console.log(genres)

    const moviePosters = relatedMovies?.map((movie, i) => {
        return (
            <Link key={i} to={`/movie/${movie.id}`}>
                <MoviePoster 
                media={movie}
                genre={genres}
                scales={false}
                />
            </Link>
        )
        
    })

      

    if (!moviePosters) return <h1>Loading</h1>
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