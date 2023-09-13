import React from 'react'

import Header from '../Components/Header'
import LogoutButton from '../Components/LogoutButton'
import BuyButton from '../Components/BuyButton'
import AccountButton from '../Components/AccountButton'

function Homepage() {
  return (
    <div className='flex flex-col h-screen w-full'>
      <Header />
        <div className='flex flex-row h-screen w-full'>
          <div className='w-2/6'></div>
          <div className='p-3 w-2/6 overflow-y-auto'>
            {/* example post */}
            <div className='flex flex-col gap-3 items-center border-2 p-3 shadow-2xl rounded-md'>
              <h1>apple</h1>
              <h1>image of apple here</h1>
              <BuyButton />
            </div> 
          </div>
          <div className='flex flex-col items-center justify-between p-3 w-2/6'>
            <AccountButton />
            <LogoutButton />
          </div>
        </div>
    </div>
  )
}

export default Homepage