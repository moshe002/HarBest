import React, { useState } from 'react'

import BuyModal from './BuyModal'

interface BuyProps {
  email: string;
  username: string;
  itemName: string;
  location: string;
  quantity: number;
  price: number;
}

const BuyButton:React.FC<BuyProps> = ({ 
  email,
  itemName,
  price,
  quantity,
  username,
  location
 }) => {

  const [buyModal, setBuyModal] = useState<boolean>(false)

  const handleBuy = () => setBuyModal(true)

  return (
    <>
      { 
        buyModal 
          && 
          <BuyModal
            email={email}
            itemName={itemName}
            username={username}
            price={price}
            quantity={quantity}
            location={location}
            setBuyModal={setBuyModal} /> 
      }
        <button
          title='buy the product'
          className='p-3 text-white font-semibold bg-green-500 hover:bg-green-600 rounded-md duration-150' 
          type='button'
          onClick={handleBuy}>
              BUY
        </button>
    </>
  )
}

export default BuyButton