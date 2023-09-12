import React from 'react'
import { supabase } from '../supabase-config'
import { useNavigate } from 'react-router-dom'

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
        console.log('user logged out')
    }

  return (
    <>
        <button
            className='p-3 font-semibold text-lg text-center bg-red-400 text-white rounded-md' 
            onClick={handleLogout} 
            type='button'>
                Logout
        </button> 
    </>
  )
}

export default LogoutButton