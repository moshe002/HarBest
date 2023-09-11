import React, { useState } from 'react'
import { Link } from "react-router-dom";

import ShowPasswordButton from '../Components/ShowPasswordButton'

function Login() {

  const [showPass, setShowPass] = useState<boolean>(false)
  const [changeType, setChangeType] = useState<string>('password')
  const [checker, setChecker] = useState<boolean>(false)

  const handleChangeInput = (e:React.SyntheticEvent) => {
    let inputText = e.target.value
    inputText.length == 0 ? setShowPass(false) : setShowPass(true)
  }

  const handleLogin = () => {
    console.log('form submitted')
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <form onSubmit={handleLogin} className='flex flex-col gap-5 border-2 p-5 rounded-md'>
            <div className='flex flex-col text-center'>
                <label className='text-2xl font-semibold' htmlFor="email">Email:</label>
                <input 
                    className='outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150' 
                    name='email' 
                    title='email' 
                    type="email" 
                    required />
            </div>
            <div className='flex flex-col items-center text-center'>
                <label className='text-2xl font-semibold' htmlFor="password">Password:</label>
                <input 
                    className='outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150'
                    name='password' 
                    title='password' 
                    type={changeType} 
                    onChange={handleChangeInput}
                    //maxLength={8}
                    //minLength={8}
                    required />
                  { 
                    showPass 
                    && 
                    <ShowPasswordButton 
                      checker={checker}
                      changeType={changeType}
                      setChecker={setChecker}
                      setChangeType={setChangeType} />
                  }
            </div>
            <input className='bg-green-300 hover:bg-green-500 text-white font-semibold cursor-pointer p-2 rounded-md duration-150' type="submit" value="LOGIN"/>
        </form>
        <Link to={'/signup'}>
          <div className='text-sm text-gray-400 underline hover:text-gray-500 duration-150'>No account? Signup here</div>
        </Link>
        
    </div>
  )
}

export default Login