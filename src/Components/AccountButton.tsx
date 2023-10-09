import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscAccount } from 'react-icons/vsc'
import { supabase } from '../supabase-config'

function AccountButton() {

    const navigate = useNavigate()

    const [username, setUsername] = useState<string>('')

    useEffect(() => {
      fetchUsername()
    }, [])

    const fetchUsername = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUsername(user?.user_metadata.username)
      //let username:string = user?.user_metadata.username
    }

  return (
    <>
        <button 
            onClick={() => { navigate('/account') }}
            title='Go to account'
            type='button' 
            className='w-auto p-3 text-white text-lg bg-blue-400 hover:bg-blue-500 duration-150 rounded-md'>
                <div className='flex flex-col gap-1 items-center'>
                    <p className='text-base'>Hello!</p>
                    <div className='flex gap-3 items-center'>
                      <p className='text-xl font-semibold'>{username}</p>          
                      <p className='text-2xl font-semibold'><VscAccount /></p>
                    </div>
                </div>
        </button>
    </>
  )
}

export default AccountButton