import React, { useState, useEffect } from 'react'
import { supabase } from '../supabase-config'
import { VscAccount } from 'react-icons/vsc'

import BackButton from '../Components/BackButton'

function Account() {

  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    setUsername(user?.user_metadata.username)
    setEmail(user?.email)
    setLoading(false)
  } 

  return (
    <div className='flex flex-col items-center justify-evenly h-screen w-full p-3'>
      <div className='flex flex-col items-center'>
        <h1 className='text-7xl'><VscAccount /></h1>
        {
          loading
          ?
            <h1 className='mt-3 text-xl font-bold'>Loading...</h1>
          :
          <>
            <h1 className='text-3xl'>{username}</h1>
            <h1 className='text-3xl'>{email}</h1>
          </>
        }
      </div>
      <div className='p-3 border-2 rounded-md'>
        <h1 className='text-xl font-semibold'>Posts:</h1>
      </div>
      <div>
        <BackButton buttonText='Back to homepage' />
      </div>
    </div>
  )
}

export default Account