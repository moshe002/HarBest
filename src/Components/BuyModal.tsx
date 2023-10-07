import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
//import { supabase } from '../supabase-config';

interface BuyProps {
  setBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  username: string;
  itemName: string;
  price: number;
  quantity: number;
  location: string;
}

const BuyModal:React.FC<BuyProps> = ({ 
  setBuyModal, 
  email,
  username,
  itemName,
  price,
  quantity,
  location  
}) => {

  const [confirmPurchase, setConfirmPurchase] = useState<boolean>(false)
  
  const handleBuy = (e:React.SyntheticEvent) => {
    e.preventDefault()
    setConfirmPurchase(true)
  }

  return (
    <>
      { 
        confirmPurchase 
        ? 
        <PurchaseSubmitted
          setBuyModal={setBuyModal} 
          setConfirmPurchase={setConfirmPurchase} /> 
        :
        <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
            <div className='flex flex-col relative w-1/3 items-center gap-5 p-10 bg-white shadow-2xl rounded-md  overflow-y-auto overflow-x-hidden max-h-full'>
                <h1 className='text-red-500 text-2xl font-bold p-3'>Confirm Purchase</h1>
                <button onClick={() => setBuyModal(false)} className='absolute top-3 right-3 hover:bg-gray-400 rounded-full duration-150' title='close btn' type='button' >
                  <p className='text-3xl p-1'>
                      <AiOutlineCloseCircle />
                  </p>
                </button>
                <div className='flex flex-col gap-3 w-full'>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Username:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{username}</h1>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Email:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{email}</h1>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Item name:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{itemName}</h1>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Quantity:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{quantity}</h1>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Price:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{price}</h1>
                  </div>
                  <div className='flex justify-between'>
                    <h1 className='text-gray-500 text-lg'>Location:&nbsp;</h1>
                    <h1 className='font-semibold text-lg'>{location}</h1>
                  </div>
                  <button 
                    className='p-3 text-lg text-white font-semibold bg-red-500 rounded-md mt-2 hover:bg-red-400' 
                    onClick={handleBuy} 
                    type='button'>
                      CONFIRM
                  </button>
                </div>
            </div>
        </div>
      }
    </>
  )
}

interface SubmittedPurchaseProp {
  setConfirmPurchase: React.Dispatch<React.SetStateAction<boolean>>;
  setBuyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PurchaseSubmitted:React.FC<SubmittedPurchaseProp> = ({ setConfirmPurchase, setBuyModal }) => {
  
  const handleClose = () => {
    setBuyModal(false)
    setConfirmPurchase(false)
  }

  return(
    <div className='fixed top-0 left-0 p-5 w-full h-screen flex justify-center items-center bg-gray-600 bg-opacity-50 z-40'>
      <div className='flex flex-col w-1/3 items-center gap-5 p-10 bg-white shadow-2xl rounded-md'>
        <div className='flex flex-col items-center gap-5 p-3'>
          <h1 className='font-bold text-3xl text-green-500'>Purchase Confirmed!</h1>
          <h1 className='text-xl font-semibold'>Please check your email for the details, thank you!</h1>
          <button 
            className='w-min p-3 bg-red-500 font-semibold text-xl text-white rounded-md' 
            onClick={handleClose} 
            type='button'>
              CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuyModal