FlimVaultProject.......(IMDB clone project)

(1)Initial stage:- 

Start with new project -> init vite and react
Setup Tailwind CSS:- 1. Goto tailwind CSS website -> Documentation -> using vite -> Follow all instruction as their mention
-----------------------------------------------------------------------

(2) Building Navigation Bar..........

Create new component NavBar.jsx. Import inside App.js and used as:- "<NavBar />"
Add Logo:- Use your logo image(make sure image should be inside project folder.) and import it.
Use Logo like this:- 
import Logo from '../MovieLogo.png'
<img className='w-[50px]'src={Logo} alt=''></img>

Now add two anchor tag for "Movies" and "WatchList" and Adjust the styling as your requirement:-
<a href = "/">Movies</a> & <a href = "/WatchList">Home</a>

Create above Two component:- "Movies.jsx" and "WatchList.jsx"

Create Routing functionality between this two component, we use -> "npm package - react-router-dom".
To install this package we use:- "npm i react-router".

Import package:- import {BrowserRouter} from 'react-router-dom'
Then wrap all the component that you import in the APP.jsx, inside "<BrowserRouter></BrowserRouter>" like:-
    <BrowserRouter>
        <NavBar/>
    </BrowserRouter>  
Now we want to route on Movies and WatchList, but NavBar remain same for these two,
So we need to import {routes} first, then use this inside <BrowserRouter> and <NavBar /> like:-
import { BrowserRouter, Routes } from "react-router-dom"; & 
    <BrowserRouter>
        <NavBar/>
            <Routes>
                <Movies/>
                <WatchList/>
            </Routes>
    </BrowserRouter>
Now we have to provide the route address or path to both two component.For that we need to import first like:-
import { BrowserRouter, Routes,Route } from "react-router-dom";
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<><Movies/></>}/>
          <Route path='/WatchList' element={<WatchList/>}/>
        </Routes>
      </BrowserRouter>
But as we see, When we click on Movies and WatchList on NavBar after setting the route, page gets reload.
To stop this reloading, Change the <a> anchor tag and Use <link to=""></link> like this:-
    <Link to='/'> Movies </Link>
    <Link to='/WatchList'> WatchList </Link>
---------------------------------------------------------------------------------------------------------------------

(3) Building the Banner of Webpage.........

Create the Banner.jsx component and import it in App.jsx like:-
import Banner from './Components/Banner';
<Route path='/' element={<><Banner/><Movies/></>}

For Banner image, we use "style" property for div, for e.g.,
<div className = "", Style={{backgroundImage : 'url()'}}>
----------------------------------------------------------------------------------------------------------------

(4) Movies and MovieCard component........

Important.....

"useEffect" hook:- 
Syntax:- "useEffect(() => {});"
useEffect will always run after everything happened.(at last moment)
useEffect always run when application start first time and also whenever state or changes is done, useEffect will run.
When useEffect run first time when application start is called "Component Mounting."
whenever state or changes is done, useEffect will run is called "Component Update."

Dependancy array []:-
When you want to run useEffect on particular state changes, i.e you can make useEffect dependant using Dependancy array[], like:-
"useEffect(() => {},[]);"
That means useEffect will run for first time when component mounting is done when Dependancy array is empty - [], but it will restrict to state changes.
So If we pass particular state in Dependancy array, only then useEffect will run again. for e.g.,
Suppose we have the count button and we maintain the state for that like this:-
const [count, setCount] = useState(0)
so if we pass this count variable in Dependancy array, then whenever count variable update only then useEffect will run like this:-
useEffect(() => {
    console.log("Count update - useEffect is run")
},[count]);

axios:- "npm install axios".
It use for HTTP request - response.

API request - response:-
For this project, we are using TMDB - movie API.
the link of the API :- `https://api.themoviedb.org/3/movie/popular?api_key=f963888389240549a62a7e7085d5d40d&language=en-US&page=1`
API key:-""
--------------------------------------------------------------------------------------------------

Create Movies.jsx and MovieCard.jsx component, then import MovieCard.jsx inside the Movies.jsx
Import Movies.jsx inside the App.jsx.

In Movies.jsx:- 
We use useEffect with axios method to get data from API like this:- 
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f963888389240549a62a7e7085d5d40d&language=en-US&page=${pageNo}`)
      .then((res) => {
        console.log(res.data.results);
        setMovies(res.data.results);
      })
  }, []);

To populate all the movies from res.data. results, we need to maintain the state for this:-
const[movies, setMovies] = useState([])
then we assign response to setMovies like we seen in above useEffect.
To show all MovieCard based on setMovies(res.data.results):- 
{movies.map((movieObj) => {
          return <MovieCard />
})}

In MovieCard.jsx:- 
create div with image as given "style" property as mention above and make it hover effect with proper image display (center and cover).
To display this MovieCard row formate, giving tailwind css flex property to Movies <div>.
To populate the movie images on movie cards, we have poster_path property inside res.data.result, we need to use that.
To use that, we have to passed as props to MovieCard like this:-
function MovieCard({movieObj, poster_path,}){} ===> <div style={{backgroundImage: `url(http://image.tmdb.org/t/p/original/${poster_path})`}}>
And also passed to Movies.jsx as:- 
{movies.map((movieObj) => {
          return <MovieCard movieObj={movieObj} poster_path={movieObj.poster_path}/>
})}
To Add name for individual MovieCard with respect to movie:-
create div for name, style as per you requirement.
Access the original_name property from res.data.result and passed it as props like this:-
<div className='text-Aqua text-xl p-2 w-full text-center bg-grey-900/60'>{name}</div>
function MovieCard({movieObj, poster_path, name}){}
Also pass this props to Movies.jsx as a value:-
{movies.map((movieObj) => {
          return <MovieCard movieObj={movieObj} poster_path={movieObj.poster_path} name={movieObj.original_name}/>
})}
-------------------------------------------------------------------------------------------

(5) Pagination........(Create multiple pages for movies)

Create new component Pagination.jsx and import inside the Movies.jsx.
Add following divs in Pagination.jsx:- 
    <div className='bg-gray-400 p-8 mt-20 flex justify-center'>
    <div className='px-8'><i className="fa-solid fa-arrow-left-long"></i></div>
    <div className='font-bold'>{pageNo}</div>
    <div className='px-8'><i className="fa-solid fa-arrow-right"></i></div>
    </div>

FontAwesome web ToolKit:-
You can use FontAwesome kit using login on FontAwesome website.
Add this <script> to your index.html file of your project to use the kit like this:- 
<script src="https://kit.fontawesome.com/dlkj.js" crossorigin="anonymous"></script>
we use arrow style from FontAwesome Kit :- <i className="fa-solid fa-arrow-left-long"></i> & <i className="fa-solid fa-arrow-right"></i>

To the page no. dynamically, First we maintain state:- In Movies.jsx 
const[pageNo, setPagaNo] = useState(1)

Create function for previous page and next page:- 
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

Pass above function as props and set this function for onClick :- In Pagination.jsx:-
function Pagination({handlePrev, handleNext, pageNo}) {
  return (
    <div className='bg-gray-400 p-8 mt-20 flex justify-center'>
    <div onClick={handlePrev} className='px-8'><i className="fa-solid fa-arrow-left-long"></i></div>
    <div className='font-bold'>{pageNo}</div>
    <div onClick={handleNext} className='px-8'><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}
To use the function, We need to pass this as props to Movies.jsx also:-
<Pagination pageNo={pageNo} handlePrev={handlePrev} handleNext={handleNext}/>
---------------------------------------------------------------------------------------------------------------------------

(6) WatchList Component........................

Create WatchList Component and Import on App.jsx.

(I) create Search Field:-
 <div className='flex justify-center my-4'>
      <input onChange={handleSearch} value={search} type='text' placeholder='Search movies' className='h-[3rem] w-[18rem] bg-grey-400 outline-none px-4'/>
</div>

(II) Create Table formate view for watchlist movies:-
<div className=' overflow-hidden rounded-lg border border-gray-200 m-8'>
      <table className='w-full text-gray-500 text-center'>
        <thead className='border-b-2'>
          <tr>
            <th>Name</th>
            <th className='flex justify-center'>
              <div className='p-2'>Rating</div>
              </th>
            <th>Popularity</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
        <tr key={movieObj.id} className='border-b-2'>
            <td className='flex item-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src ={`https://image.tmdb.org/t/p/original${movieObj.poster_path.startsWith('/') ? movieObj.poster_path : '/' + movieObj.poster_path}`}/>
              <div className='mx-10 justify-center'>{movieObj.original_title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            <td className='text-red-800'>Delete</td>
          </tr>
        </tbody>
    </table>
</div>

(III) Create Genre tabs :- 
<div className='flex justify-center flex-wrap m-4'>
<div className="flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4"> Action</div>
<div className="flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4">Comedy</div>
</div>

(IV) To add movie in WatchList, Create Emoji button on every MovieCard:-
In MovieCard.jsx:-
<div className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-900/60'>&#128525;</div>
------------------------------------------------------------------------------------------------------------------------------------

(7) Adding movie to WatchList:-
To add movie in WatchList, First maintain the state:- In App.jsx:-
let[watchList, setWatchList] = useState([])

Now create function for adding movie:-
  let handleAddToWatchlist = (movieObj)=>{
    let newWatchList = [...watchList, movieObj]
    setWatchList(newWatchList)
    console.log(newWatchList)
  }
Here, movieObj is the movie-data that we click or we want to add in watchlist.
based on that particular movieObj, create newWatchList using (...) sperd operator - [...watchList, movieObj]
then setWatchList as newWatchList and console.log to check whether is add or not.

pass the handleAddToWatchlist function as props:-
In App.jsx:-
<Movies handleAddToWatchlist={handleAddToWatchlist}/> ===> pass to Movies.jsx ===>
In Movies.jsx:-
function Movies({handleAddToWatchlist}){
    return(
        <MovieCard handleAddToWatchlist={handleAddToWatchlist}/>
    )
} 
===> pass to MovieCard.jsx ===>
In MovieCard.jsx:-
function MovieCard({handleAddToWatchlist}){
    return(
        <div onClick={() => {handleAddToWatchlist(movieObj)}}></div> --> For Emoji button.
    )
}
The above passing the props process is called "props drillings."(Passing props from one to another component.)
-------------------------------------------------------------------------------------------------------


(8) Remove Movie from WatchList.......

For this first create function to remove movie from WatchList:-
  let handleRemoveToWatchlist = (movieObj) => {
    let filterWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id
    })
    setWatchList(filterWatchList);
    console.log(filterWatchList);
  }
Here, movieObj is the movie data that we want to remove from WatchList.
based on the movieObj, we filter WatchList for each movie where if individual movie id is matching with movieObj id or not.
if this match then that individual movie id will remove, and if not match then will return all rest of individual movie id.
Then we set this new filter movie id arr as setWatchList:- setWatchList(filterWatchList);

Similarly, pass the handleRemoveToWatchlist function as props:-
In App.jsx:-
<Movies handleRemoveToWatchlist={handleRemoveToWatchlist}/> ===> pass to Movies.jsx ===>
In Movies.jsx:-
function Movies({handleRemoveToWatchlist}){
    return(
        <MovieCard handleRemoveToWatchlist={handleRemoveToWatchlist}/>
    )
} 
===> pass to MovieCard.jsx ===>
In MovieCard.jsx:-
function MovieCard({handleRemoveToWatchlist}){
    return(
        <div onClick={() => {handleRemoveToWatchlist(movieObj)}}></div> --> For Emoji button.
    )
}
The above passing the props process is called "props drillings."(Passing props from one to another component.)

Before removing the movie, we should check first that whether movie is already present inside watchlist or not.
So we have to access the watchlist first, for that we have to pass the WatchList as a props from App.jsx=> Movies.jsx => MovieCard.jsx Like:-
In App.jsx:- 
<Movies watchList={watchList}/>
In Movies.jsx:-
function Movies({watchList}){
    return(
        <MovieCard watchList={watchList}/>
    )
} 
In MovieCard.jsx:- 
function MovieCard({watchList}){}

then create function inside MovieCard function, like this:- 
function MovieCard({movieObj, poster_path, name, handleAddToWatchlist, handleRemoveToWatchlist, watchList,}) {
  // Emoji button validation function to check whether movie exists inside the watchlist or not.
  function doesContain(movieObj){
    for(let i=0; i < watchList.length; i++){
      if(watchList[i].id === movieObj.id){
        return true;
      }
    }
    return false;
  }
}
Here, doesContain function take movieObj as parameter, Inside loop - start from zero till watchList length it will check for,
whether it match with watchList "i" placed id or not, If match then return true, or else return false.

Adding Toggle Effect on Emoji Button:-

With the help of doesContain(), we can Add toggle Effect on Emoji button :- Showing cross sign:-
This will act like, When you click on Emoji it will add movie into WatchList, and Emoji will convert into (X) sign.
And if you again click on (X) sign, then movie gets remove from WatchList like this:- In MovieCard.jsx:-
 return (
      {doesContain(movieObj) ? 
        <div onClick={() => {handleRemoveToWatchlist(movieObj)}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-900/60'>&#10060;</div>
       : 
      <div onClick={() => {handleAddToWatchlist(movieObj)}} className='m-4 flex justify-center h-8 w-8 items-center rounded-lg bg-blue-900/60'>&#128525;</div>
      }
 )
Here, using doesContain(), if it return true, that means movie exists, then Emoji button will turn to (X) sign.
or els if it return false, that means movie does not exists, then show Emoji button as it is.
-----------------------------------------------------------------------------------------------------------------------------------

(9) To Display Watchlist..........

To populate the Watchlist, based on movies that we add, using above handleAddToWatchlist(),
and store the value inside the "watchList" of useState().
So now we have to pass this "watchList" as props to WatchList.jsx component to access it like this:-
In App.jsx:-
<WatchList watchList={watchList}/>
In WatchList.jsx:-
function WatchList({watchList}){}

Now to show this watchList data inside the table we have created inside WatchList.jsx component, we use:-
<tbody>
  <watchList.map((movieObj) => {
    return(
      <tr key={movieObj.id} className='border-b-2'>
            <td className='flex item-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src ={`https://image.tmdb.org/t/p/original${movieObj.poster_path.startsWith('/') ? movieObj.poster_path : '/' + movieObj.poster_path}`}/>
              <div className='mx-10 justify-center'>{movieObj.original_title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            {/* Here, we want genreids for particular movieObj but it will return array of it so we want only 0th position id. */}
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            {/* Delete button work */}
            <td onClick={() => handleRemoveToWatchlist(movieObj)} className='text-red-800'>Delete</td>
      </tr>
    )
  })
</tbody>
Here, we can add Image:- poster_path:- {movieObj.poster_path},
name = {movieObj.original_title}, rating:- {movie.vote_average}, popularity:- {movieObj.popularity} etc.

(10) Saving Watchlist data on localStorage.........

When we refresh the webpage, all movies data are vanished and watchlist gets empty.
So we need to save this data, for that we can use browser localStorage:- browser -> (right-click)webpage -> application tab -> storage -> localStorage.
we save the data here as "key : value" formate. You can access localStorage directly like:-
In handleAddToWatchlist():- In App.jsx:-
  let handleAddToWatchlist = (movieObj)=>{
    let newWatchList = [...watchList, movieObj]
    localStorage.setItems('movieData', JSON.stringify(newWatchList))
    setWatchList(newWatchList)
    console.log(newWatchList)
  }
Here, we accessing localStorage using setItems(), set 'movieData' as key and 'newWatchList' as value.
but 'newWatchList' is consider as an Object, so we need to use "JSON.stringify()" to retrieve the data from object.

Now we want to pass this localStorage data to generate the watchList:-
We use useEffect to run at App.jsx, if localStorage has any movie data then it will add to watchList,or not.for e.g.,
In App.jsx:-
  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesData')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage)) 
  },[])
Here, useEffect will run first time because of [] - (Dependancy array), when we search the movie in localStorage using localStorage.getItem(), with key 'movieData'.
if there is no data return or else setWatchList with JSON converted data as 'moviesFromLocalStorage'.
---------------------------------------------------------------------------------------------------

(11) Search movie in WatchList:-(using Search input field):-

First maintain state for search input field:-
const [search, setSearch] = useState('') -> initial value of useState will be empty string.

then create the function to handle the search event for input:-
  let handleSearch = (e) => {
    setSearch(e.target.value)
  }
here e is the event object.

set the function for input field as onClick and value:-
<input onChange={handleSearch} value={search} type='text' 
placeholder='Search movies' className='h-[3rem] w-[18rem] bg-grey-400 outline-none px-4'/>

Now based on value entered in input field, we need to filter the movie data of watchList, for that we can use:- watchList.filter() on previous watchList.map()
Here, we filter result first based on input and then map that on watchList:- watchList.filter().map():- for e.g.,
          watchList.filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
          }).map((movieObj)=>{
            return <tr key={movieObj.id} className='border-b-2'>
            <td className='flex item-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src ={`https://image.tmdb.org/t/p/original${movieObj.poster_path.startsWith('/') ? movieObj.poster_path : '/' + movieObj.poster_path}`}/>
              <div className='mx-10 justify-center'>{movieObj.original_title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            {/* Here, we want genreids for particular movieObj but it will return array of it so we want only 0th position id. */}
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            {/* Delete button work */}
            <td onClick={() => handleRemoveToWatchlist(movieObj)} className='text-red-800'>Delete</td>
          </tr>
          })
Here, based on movieObj, we select movieObj.title -> convert them into lowercase using - toLowerCase(),
then return using includes() only those title that having same letter in search.toLocaleLowerCase() variable/method.
-----------------------------------------------------------------------------------------------------

(12) Sorting movies based on Ratings...........

First we design the rating heading in the table. We are adding two arrows:- UP arrow (↑) and Down Arrow (↓) like this:-
here we using FontAwesome kit:-
            <th className='flex justify-center'>
              <div className='p-2'><i className="fa-solid fa-arrow-up"></i></div>
              <div className='p-2'>Rating</div>
              <div className='p-2'><i className="fa-solid fa-arrow-down"></i></div>
              </th>

We have to get setWatchList as props from App.jsx to WatchList.jsx:- Because we create setWatchList in App.jsx:-
In App.jsx:-
<WatchList setWatchList={setWatchList}/>
In WatchList.jsx:-
function WatchList({setWatchList}){}

Now we have to create the function for sorting data by increased or decreased order:-
1. Increasing Ratings basis...
  let sortIncreasingOrder = () => {
    let sortIncreaseOrder = watchList.sort((movieA , movieB) => {
      return movieA.vote_average - movieB.vote_average
    })
    setWatchList([...sortIncreaseOrder])
  }
Here, we access the watchlist using sort(), taking two movie data as parameter - movieA and movieB.
and compare and return increased order from this two like:- return movieA.vote_average - movieB.vote_average
Now using setWatchList props, assign new sorted watchlist to setWatchList.

2. Decreasing Ratings basis....
  let sortDecreasingOrder = () => {
    let sortDecreaseOrder = watchList.sort((movieA , movieB) => {
      return movieB.vote_average - movieA.vote_average
    })
    setWatchList([...sortDecreaseOrder])
  }
Here, we access the watchlist using sort(), taking two movie data as parameter - movieA and movieB.
and compare and return decreased order from this two like:- return movieB.vote_average - movieA.vote_average
Now using setWatchList props, assign new sorted watchlist to setWatchList.

Now pass this function to UP arrow (↑) and Down Arrow (↓) like this:-
<div onClick={sortIncreasingOrder}> and <div onClick={sortDecreasingOrder}>
-----------------------------------------------------------------------------------------------------------------

(13) Genre Based watchList movies........

First create the "Genre.js" file for genre id object :- vite-project -> src -> Utility -> Genre.js. and export it.
Import it inside the WatchList.jsx :- In WatchList.jsx:- import genreids from '../Utility/Genre'.

Now In table, to get corresponding movie genre, use :- <td>{genreids[movieObj.genre_ids[0]]}</td>
Here, we compare genreids that we import with that particular movieObj and get only genre-ids on "1st" position of id.('0'th element of array). 

Let's work on Genre based filters..........

First create the state for the genre :- In WatchList.jsx:-
const[genreList, setGenreList] = useState(['All Genres']) --> initial value is holding array
so for this state changes, we create useEffect:-
  useEffect(()=>{
    let temp = watchList.map((movieObj)=> {
      return genreids[movieObj.genre_ids[0]]
    })
    temp = new Set(temp)
    setGenreList(['All Genres', ...temp]) --> set value as an array.
  }, [watchList])
Here, Inside the useEffect, we create 'temp' variable that use watchlist and map every movieObj from that and return first genre_ids of movie.
That movie id we stored inside the new set and save it inside 'temp' only. 
new set is special method that removes all the duplicate value from the array.
Now we setGenreList using (...) sperd operator on 'temp'. 
And this useEffect will run only when we change the watchList that passed inside the []-(Dependancy array).

Now first we create all genre tab on webpage :- In WatchList.jsx :- above search bar:- 
    <div className='flex justify-center flex-wrap m-4'>
      {/* Populate Genre tab */}
      {genreList.map((genre, index) => {
        return <div className='flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4'>
          {genre}</div>
      })}
    </div>
Here, we create the genre tab using genreList values create by useEffect, map each value as genre and return it.
Display each individual genre as {genre}.

Now we want to show only select genre is in blue color and rest of all in grey color. For this changes we maintain different state:- 
const[currGenre, setCurrGenre] = useState('All Genres') --> initial value we showing is all genres.

Create function to filter genre that we select and set as selected genre:-
  let handleFilter = (genre) => {
    setCurrGenre(genre)
  }

To display this in blue color, first add click event trigger and based on that apply ternary operator condition to filter genre like this:-
    <div className='flex justify-center flex-wrap m-4'>
      {/* Populate Genre tab */}
      {genreList.map((genre, index) => {
        return <div key={index} onClick={() => handleFilter(genre)} --> click event trigger
        className={currGenre == genre ? 
        'flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold mx-4' : 
        'flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold mx-4'}>
          {genre}</div>
      })}
    </div>

Now we just want to show the movie that we selected on Genre tab, with respect to watchlist genre id:- In WatchList.jsx:- Inside <tbody> :-
we use watchList.filter().filter() method like this:- 
        <tbody>
          {/* return movie based on selected Genre */}
          {watchList.filter((movieObj)=> {
            if(currGenre == 'All Genres'){
              return true
            }else{
              return genreids[movieObj.genre_ids[0]] == currGenre
            }
          })
          // filter movie based on user input on search bar.
          .filter((movieObj) => {
            return movieObj.title.toLowerCase().includes(search.toLocaleLowerCase())
          }).map((movieObj)=>{
            return <tr key={movieObj.id} className='border-b-2'>
            <td className='flex item-center px-6 py-4'>
              <img className='h-[6rem] w-[10rem]' src ={`https://image.tmdb.org/t/p/original${movieObj.poster_path.startsWith('/') ? movieObj.poster_path : '/' + movieObj.poster_path}`}/>
              <div className='mx-10 justify-center'>{movieObj.original_title}</div>
            </td>
            <td>{movieObj.vote_average}</td>
            <td>{movieObj.popularity}</td>
            {/* Here, we want genreids for particular movieObj but it will return array of it so we want only 0th position id. */}
            <td>{genreids[movieObj.genre_ids[0]]}</td>
            {/* Delete button work */}
            <td onClick={() => handleRemoveToWatchlist(movieObj)} className='text-red-800'>Delete</td>
          </tr>
          })}
        </tbody>
here, we use filter() method first, where each movieObj of watchlist will check if currGenre == 'All Genres' or not.
If its true simply return else if not matched, then match only first genre_ids with currGenre and return.
Based on this filter, we apply next filter() and map() method to show data.
----------------------------------------------------------------------------------------------------------------------------------------

(14) Delete button worK :- Delete movie from watchlist:- 

Here, we are using our previous defined function called "handleRemoveToWatchlist".
For that we need to pass the function as props from App.jsx to WatchList.jsx like this:- 
In App.jsx:-
<WatchList handleRemoveToWatchlist={handleRemoveToWatchlist}/>
In WatchList.jsx:-
function WatchList({watchList, setWatchList, handleRemoveToWatchlist}){}
Now pass the props as click event for Delete button  and give movieObj as an argument like this:- 
<td onClick={() => handleRemoveToWatchlist(movieObj)} className='text-red-800'>Delete</td>

Remember here that we use the WatchList data from localStorage, so if we delete something from WatchList, we have to update the localStorage.
For that Update your handleRemoveToWatchlist function like this:- In App.jsx:-
  let handleRemoveToWatchlist = (movieObj) => {
    let filterWatchList = watchList.filter((movie) => {
      return movie.id !== movieObj.id
    })
    setWatchList(filterWatchList);
    // to save the watchlist on local storage while refresh the website. It will save in key:value formate. here moviesData is key & filterWatchList is value.
    localStorage.setItem('moviesData', JSON.stringify(filterWatchList))
    console.log(filterWatchList);
  }
Here, we setItem in localStorage of watchList after changes/delete the movies as filterWatchList using 'moviesData' key and JSON.stringify().
----------------------------------------------------------------------------------------------------------------------------------------------