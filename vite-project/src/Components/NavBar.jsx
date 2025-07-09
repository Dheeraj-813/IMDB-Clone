/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '../MovieLogo.png'
import { Link } from 'react-router'

let NavBar = () => {
  return (
    <div className='flex border space-x-8 items-center pl-3 py-4'>
        <img className='w-[50px]'src={Logo} alt=''></img>
        {/* Adding link must add from react-router-dom  path to App.jsx like path = '/' */}
        <Link to='/' className='text-blue-500 text-3xl font-bold'>Movies</Link>
        {/* Adding link must add from react-router-dom path to App.jsx like path = '/WatchList' */}
        <Link to='/WatchList' className='text-blue-500 text-3xl font-bold'>WatchList</Link>
    </div>
  )
}

export default NavBar