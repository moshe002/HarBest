import React from 'react'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'

function AccountButton() {

    const navigate = useNavigate()

  return (
    <>
        <button 
            onClick={() => { navigate('/account') }}
            title='Go to account'
            type='button' 
            className='w-28 p-3 text-white text-lg bg-blue-400 hover:bg-blue-500 font-semibold duration-150 rounded-md'>
                <div className='flex gap-1 items-center justify-center'>
                    <p className='text-base'>Account</p>          
                    <p className='text-xl'><VscAccount /></p>
                </div>
        </button>
    </>
  )
}

export default AccountButton