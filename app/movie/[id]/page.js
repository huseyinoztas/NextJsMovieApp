import React from 'react'
import {notFound} from 'next/navigation'
import MovieContainer from '@/containers/movie'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `${process.env.API_KEY}`
  }
};

const getMovie = async (movieid) => {
  try {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieid}?language=en-US`, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

async function MoviePage({params, searchParams}) {

    const movieDetail = await getMovie(params.id);

    if(!movieDetail) {
        notFound()
    }

    if(searchParams.error === 'true' ) {
        throw new Error('Error Happened');
    }
    
  return (
    <MovieContainer movie= {movieDetail} />
  )
}

export default MoviePage
