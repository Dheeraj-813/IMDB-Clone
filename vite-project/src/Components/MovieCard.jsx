/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import WatchList from './WatchList'

function MovieCard({movieObj, poster_path, name, handleAddToWatchlist, handleRemoveToWatchlist, watchList,}) {

  function doesContain(movieObj){
    for(let i=0; i < watchList.length; i++){
      if(watchList[i].id === movieObj.id){
        return true;
      }
    }
    return false;
  }

  return (
    <div className='h-[40vh] w-[180px] bg-center bg-cover rounded-xl hover:cursor-pointer hover:scale-110 duration-300 flex flex-col justify-between items-end' style={{backgroundImage: `url(http://image.tmdb.org/t/p/original/${poster_path})`}}>

      {doesContain(movieObj) ? 
        <div onClick={() => {handleRemoveToWatchlist(movieObj);}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-900/60'>&#10060;;</div>
       : 
      <div onClick={() => {handleAddToWatchlist(movieObj)}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-900/60'>&#128525;</div>
      }
        
      <div className='text-Aqua text-xl p-2 w-full text-center bg-grey-900/60'>{name}</div>

    </div>
  )
}

export default MovieCard