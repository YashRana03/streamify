
// This file contains all the functions used make the various api calls in order to obtain the data

export async function getTrendingData() {
    const response = await fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    if (!response.ok) {
        throw {
            message: "Failed to fetch Trending Data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results.slice(0, 16)

}

export async function getGenreData() {
    const response1 = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    if (!response1.ok) {
        throw {
            message: "Failed to fetch Movie genre data",
            status: response1.status,
            statusText: response1.statusText
        }
    }
    const data1 = await response1.json()

    const genreMovies = data1.genres
    let dictMovies = {}
    for (let i=0; i<genreMovies.length; i++) {
        dictMovies[genreMovies[i].id] = genreMovies[i].name
  
    }

    const response2 = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    if (!response2.ok) {
        throw {
            message: "Failed to fetch Show genre data",
            status: response2.status,
            statusText: response2.statusText
        }
    }
    const data2 = await response2.json()

    const genreShows = data2.genres
    let dictShows = {}
    for (let i=0; i<genreShows.length; i++) {
        dictShows[genreShows[i].id] = genreShows[i].name
  
    }

    return {genresMovie: dictMovies, genresShows: dictShows}
}

export async function getMovieData() {
    const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=5&sort_by=popularity.descc&with_origin_country=US%7CGB&primary_release_date.lte=2023-12-12&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    if (!response.ok) {
        throw {
            message: "Failed to fetch Movie data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results.slice(0, 16)
}

export async function getShowData() {
    const response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=2&sort_by=popularity.desc&with_origin_country=US%7CGB&vote_average.gte=8&api_key=7af7f0da356b6bf29e4f80a35298d70a')
    if (!response.ok) {
        throw {
            message: "Failed to fetch Show data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results.slice(0, 16)
}


export async function getMovieDetails(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a`)
    if(!response.ok) {
        throw {
            message: "Failed to fetch Movie Data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data
}

export async function getShowDetails(id) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=7af7f0da356b6bf29e4f80a35298d70a`)
    if(!response.ok) {
        throw {
            message: "Failed to fetch Show Data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data
}

export async function getMovieReviews(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1&api_key=7af7f0da356b6bf29e4f80a35298d70a`)
    if(!response.ok) {
        throw {
            message: "Failed to fetch Movie Review Data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results
}
export async function getShowReviews(id) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1&api_key=7af7f0da356b6bf29e4f80a35298d70a`)
    if(!response.ok) {
        throw {
            message: "Failed to fetch Show Review Data",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results
}

export async function getRelatedMovies(genres) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&with_origin_country=US%7CGB&api_key=7af7f0da356b6bf29e4f80a35298d70a`)

    if(!response.ok) {
        throw {
            message: "Failed to fetch Related Movies",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results
}
export async function getRelatedShows(genres) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genres}&with_origin_country=US%7CGB&api_key=7af7f0da356b6bf29e4f80a35298d70a`)

    if(!response.ok) {
        throw {
            message: "Failed to fetch Related Movies",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results
}

export async function searchMedia(query) {
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1&api_key=7af7f0da356b6bf29e4f80a35298d70a`)

    if(!response.ok) {
        throw {
            message: "Failed to fetch Search results",
            status: response.status,
            statusText: response.statusText
        }
    }
    const data = await response.json()
    return data.results
}


