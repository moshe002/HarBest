import React from 'react'

function BuyButton() {
  return (
    <>
        <button
          title='buy the product'
          className='p-3 text-white font-semibold bg-green-500 hover:bg-green-600 rounded-md duration-150' 
          type='button'>
              BUY
        </button>
    </>
  )
}

export default BuyButton