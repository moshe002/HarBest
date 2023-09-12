import React from 'react'

import Header from '../Components/Header'
import LogoutButton from '../Components/LogoutButton'

function Homepage() {
  return (
    <div className='h-screen w-full'>
        <Header />
        <h1>homepage</h1>
        <LogoutButton />
    </div>
  )
}

export default Homepage