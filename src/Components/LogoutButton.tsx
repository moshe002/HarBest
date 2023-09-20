import React from 'react'
import { supabase } from '../supabase-config'
import { useNavigate } from 'react-router-dom'

import { HiOutlineLogout } from 'react-icons/hi'

function LogoutButton() {

    const navigate = useNavigate()

    const handleLogout = async (e:React.SyntheticEvent) => {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signOut()
            if(error){
                console.log(error)
            }
            navigate('/')
        } catch(error){
            console.error(error)
        }
        //console.log('user logged out')
    }

  return (
    <>
        <button
            className='w-28 p-3 font-semibold text-white text-center bg-red-400 hover:bg-red-500 duration-150 rounded-md' 
            onClick={handleLogout} 
            title='logout? no?'
            type='button'>
                <div className='flex gap-1 items-center justify-center'>
                    <p className='text-base'>Logout</p>          
                    <p className='text-xl'><HiOutlineLogout /></p>
                </div>
        </button> 
    </>
  )
}

export default LogoutButton