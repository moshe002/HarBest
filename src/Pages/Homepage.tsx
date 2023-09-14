import React from 'react'

import Header from '../Components/Header'
import Feed from '../Components/Feed'
import PostAndSearch from '../Components/PostAndSearch'
import LogoutAndAccountContainer from '../Components/LogoutAndAccountContainer'

function Homepage() {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
        <div className='flex flex-row h-screen w-full overflow-hidden'>
          <PostAndSearch />
          <Feed />
          <LogoutAndAccountContainer />
        </div>
    </div>
  )
}

export default Homepage