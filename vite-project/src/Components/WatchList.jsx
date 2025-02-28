



/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react'
import genreids from '../Utility/Genre'

function WatchList({watchList, setWatchList, handleRemoveToWatchlist}) {

  const [search, setSearch] = useState('')
  const[genreList, setGenreList] = useState(['All Genres'])
  const[currGenre, setCurrGenre] = useState('All Genres')
  

  let handleSearch = (e) => {
    setSearch(e.target.value)
  }

  let sortIncreasingOrder = () => {
    let sortIncreaseOrder = watchList.sort((movieA , movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortIncreaseOrder])
  }

  let sortDecreasingOrder = () => {
    let sortDecreaseOrder = watchList.sort((movieA , movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortDecreaseOrder])
  }

  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }

  useEffect(()=>{
    let temp = watchList.map((movieObj)=> {
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All Genres', ...temp])
  }, [watchList])

  return (
    <>
    {/* Sorting field content */}
    <div className='flex justify-center flex-wrap m-4'>
      {genreList.map((genre, index) => {
        return <div key={index} onClick={() => handleFilter(genre)} 
        className={currGenre == genre ? 'flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4' : 'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4'}>
          {genre}</div>
      })}
      
      {/* <div className='flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400/50 rounded-xl text-white font-bold mx-4'></div> */}
    </div>

    {/* input text field - Search Bar */}
    <div className='flex justify-center my-4'>
      <input onChange={handleSearch} value={search} type='text' placeholder='Search movies' className='h-[3rem] w-[18rem] bg-grey-400 outline-none px-4'/>
    </div>

    {/* Table data formate - Movie list */}
    <div className=' overflow-hidden rounded-lg border border-gray-200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
          <tr>
            <th>Name</th>
            <th className='flex justify-center'>
              <div onClick={sortIncreasingOrder} className='p-2'><i className="fa-solid fa-arrow-up"></i></div>
              <div className='p-2'>Rating</div>
              <div onClick={sortDecreasingOrder} className='p-2'><i className="fa-solid fa-arrow-down"></i></div>
              </th>
            <th>Popularity</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {watchList.filter((movieObj)=> {
            if(currGenre == 'All Genres'){
              return true
            }else{
              return genreids[movieObj.genre_ids[0]] == currGenre
            }
          }).filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
          }).map((movieObj)=>{
            return <tr key={movieObj.id} className='border-b-2'>
            <td className='flex item-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src ={`https://image.tmdb.org/t/p/original${movieObj.poster_path.startsWith('/') ? movieObj.poster_path : '/' + movieObj.poster_path}`}/>
              <div className='mx-10 justify-center'>{movieObj.original_title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            <td onClick={() => handleRemoveToWatchlist(movieObj)} className='text-red-800'>Delete</td>
          </tr>
          })}
          
        </tbody>
      </table>
    </div>
    </>
  )
}

export default WatchList