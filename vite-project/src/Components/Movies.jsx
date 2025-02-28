/* eslint-disable react/prop-types */


/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination';

function Movies({handleAddToWatchlist, handleRemoveToWatchlist, watchList}) {

  const[movies, setMovies] = useState([])
  const[pageNo, setPagaNo] = useState(1)

  const handlePrev = () => {
    if(pageNo == 1){
      setPagaNo({pageNo})
    }
    else{
      setPagaNo(pageNo - 1)
    }
  }

  const handleNext = () => {
    setPagaNo(pageNo + 1)
  }

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f963888389240549a62a7e7085d5d40d&language=en-US&page=${pageNo}`)
      .then((res) => {
        console.log(res.data.results);
        setMovies(res.data.results);
      })
  }, [pageNo]);


  return (
    <div className='p-5'>
        <div className='text-2xl m-5 font-bold text-center'>Trending Movies
        </div>

        <div className='flex flex-row flex-wrap justify-around gap-8'>
        {movies.map((movieObj) => {
          return <MovieCard key={movieObj.id} movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_name} watchList={watchList} handleAddToWatchlist={handleAddToWatchlist} handleRemoveToWatchlist={handleRemoveToWatchlist}/>
        })}
        </div>

        <Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext}/>
        
    </div>
  )
}

export default Movies
// api url = https://api.themoviedb.org/3/person/popular?api_key=f963888389240549a62a7e7085d5d40d&language=en-US&page=1

// api url = https://api.themoviedb.org/3/movie/popular?api_key=f963888389240549a62a7e7085d5d40d&language=en-US&page=1