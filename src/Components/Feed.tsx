import React from 'react'

import BuyButton from './BuyButton'

function Feed() {
  return (
    <>
        <div className='flex flex-col gap-5 p-3 w-2/6 overflow-y-auto'>
            {/* example post */}
            <div className='flex flex-col gap-3 items-center border-2 p-3 rounded-md'>
              <h1>apple</h1>
              <h1>image of apple here</h1>
              <BuyButton />
            </div>
            <div className='flex flex-col gap-3 items-center border-2 p-3 rounded-md'>
              <h1>apple</h1>
              <h1>image of apple here</h1>
              <BuyButton />
            </div>
            <div className='flex flex-col gap-3 items-center border-2 p-3 rounded-md'>
              <h1>apple</h1>
              <h1>image of apple here</h1>
              <BuyButton />
            </div>
            <div className='flex flex-col gap-3 items-center border-2 p-3 rounded-md'>
              <h1>apple</h1>
              <h1>image of apple here</h1>
              <BuyButton />
            </div> 
        </div>
    </>
  )
}

export default Feed