

import { useEffect, useState } from 'react';
import './App.css'
import Banner from './Components/Banner';
import Movies from './Components/Movies'
import NavBar from './Components/NavBar'
import WatchList from './Components/WatchList'
import { BrowserRouter, Route, Routes } from "react-router";

function App() {

  let[watchList, setWatchList] = useState([])

  let handleAddToWatchlist = (movieObj)=>{
    let newWatchList = [...watchList, movieObj]
    localStorage.setItem('moviesData', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }

  let handleRemoveToWatchlist = (movieObj) => {
    let filterWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id
    })
    setWatchList(filterWatchList);
    localStorage.setItem('moviesData', JSON.stringify(filterWatchList))
    console.log(filterWatchList);
  }

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesData')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  },[])

  return (
    <>

      <BrowserRouter>

        <NavBar/>

        <Routes>

          <Route path='/' element={<><Banner/><Movies watchList={watchList} handleAddToWatchlist={handleAddToWatchlist} handleRemoveToWatchlist={handleRemoveToWatchlist} /></>}/>

          <Route path='/WatchList' element={<WatchList watchList={watchList} setWatchList={setWatchList} handleRemoveToWatchlist={handleRemoveToWatchlist}/>}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
