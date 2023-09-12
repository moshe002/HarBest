import React from 'react'
import BackButton from './BackButton'

function UserSignedIn() {
  return (
    <div className=''>
        <div className='flex flex-col items-center p-5 shadow-2xl'>
            <h1 className='font-bold text-3xl text-center'>Account created!</h1>
            <BackButton buttonText='Login' />
        </div>
    </div>
  )
}

export default UserSignedIn