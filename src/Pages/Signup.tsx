import React, { useState } from 'react'

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

import BackButtons from '../Components/BackButton'

function Signup() {

  const [showPass, setShowPass] = useState<boolean>(false)
  const [changeType, setChangeType] = useState<string>('password')
  const [checker, setChecker] = useState<boolean>(false)

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    console.log('works')
  }

  const handleChangeInput = (e:React.SyntheticEvent) => {
    let inputText = e.target.value
    inputText.length == 0 ? setShowPass(false) : setShowPass(true)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-semibold'>Signup here</h1>
        <br />
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 p-5 rounded-md' action="">
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
                  required />
                  { 
                    showPass 
                    && 
                    <button 
                      className='text-center mt-1 w-auto text-2xl p-1 bg-gray-400 text-white rounded-md'
                      type='button' 
                      title='show password'
                      onClick={() => {
                        if(checker == false) {
                          setChangeType('text')
                          setChecker(true)
                        } else {
                          setChangeType('password')
                          setChecker(false)
                        }
                      }}>
                        { changeType == 'text' ? <AiOutlineEyeInvisible /> : <AiOutlineEye />  }
                      </button> 
                  }
            </div>
            <input 
              className='bg-green-300 hover:bg-green-500 text-white font-semibold cursor-pointer p-2 rounded-md duration-150' 
              type="submit" 
              value="SIGNUP"/>
        </form>
        <br />
        <BackButtons buttonText={'Back to login'} />
    </div>
  )
}

export default Signup