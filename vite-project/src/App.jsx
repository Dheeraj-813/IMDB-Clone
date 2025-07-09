

import { useEffect, useState } from 'react';
import './App.css'
import Banner from './Components/Banner';
import Movies from './Components/Movies'
import NavBar from './Components/NavBar'
import WatchList from './Components/WatchList'
// to add routing first install react-route-dom from npm
import { BrowserRouter, Route, Routes } from "react-router";

function App() {

  let[watchList, setWatchList] = useState([])

  let handleAddToWatchlist = (movieObj)=>{
    let newWatchList = [...watchList, movieObj]
    // to save the watchlist on local storage while refresh the website. It will save in key:value formate. here moviesData is key & newWatchList is value.
    localStorage.setItem('moviesData', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }

  let handleRemoveToWatchlist = (movieObj) => {
    let filterWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id
    })
    setWatchList(filterWatchList);
    // to save the watchlist on local storage while refresh the website. It will save in key:value formate. here moviesData is key & filterWatchList is value.
    localStorage.setItem('moviesData', JSON.stringify(filterWatchList))
    console.log(filterWatchList);
  }

  // Access the watchlist data from local storage.
  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesData')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage)) 
  },[])

  return (
    <>

    {/* Adding routing to all application we enclosed inside BrowserRouter */}

      <BrowserRouter>

        <NavBar/>

        {/* Adding routing to movies and watchlist only because NavBar is fixed for homepage. */}

        <Routes>

          {/* path and element is necessary because link is add to component inside NavBar.jsx */}

          <Route path='/' element={<><Banner/><Movies watchList={watchList} handleAddToWatchlist={handleAddToWatchlist} handleRemoveToWatchlist={handleRemoveToWatchlist} /></>}/>

          <Route path='/WatchList' element={<WatchList watchList={watchList} setWatchList={setWatchList} handleRemoveToWatchlist={handleRemoveToWatchlist}/>}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
