import React, { useState, useReducer } from 'react'
import { supabase } from '../supabase-config'
import { reducer, defaultState } from '../Reducer/LoginSignupReducer'

import Header from '../Components/Header'
import ShowPasswordButton from '../Components/ShowPasswordButton'
import BackButtons from '../Components/BackButton'
import UserSignedIn from '../Components/UserSignedIn'
import PasswordChecker from '../Components/PasswordChecker'

function Signup() {

  const [state, dispatch] = useReducer(reducer, defaultState)  

  const [showPass, setShowPass] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const [userPassword, setUserPassword] = useState<string>('')
  const [checker, setChecker] = useState<boolean>(false)
  const [userSignedIn, setUserSignedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let email:string = userEmail
    let password:string = userPassword
    let username:string = userName
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        }
      }
    })
    if(error){
      console.log(error)
    }
    if(data){
      //console.log(data)
      setUserSignedIn(true)
    }
    setLoading(false)
  }

  const handleChangeInput = (pass:string) => {
    let inputText = pass
    setUserPassword(pass)
    inputText.length == 0 ? setShowPass(false) : setShowPass(true)
    if(inputText.length < 6) {
      dispatch({ type: 'password_checker', passwordChecker: true })
      dispatch({ type: 'change_password_text', passwordText: 'Password too short!' })
      dispatch({ type: 'change_text_color', changeColor: 'text-red-500' })
    } else {
      dispatch({ type: 'change_password_text', passwordText: 'Password length is good.' })
      dispatch({ type: 'change_text_color', changeColor: 'text-green-500' })
    }
  }

  return (
    <>
      { userSignedIn && <UserSignedIn /> }  
      <Header />
      <div className='flex flex-col items-center justify-center p-10 h-screen'>
          <h1 className='text-blue-500 text-2xl font-bold'>Signup here</h1>
          <br />
          <form onSubmit={handleSubmit} className='flex flex-col gap-5 border-2 p-5 rounded-md' action="">
            <div className='flex flex-col text-center'>
              <label className='text-2xl font-semibold' htmlFor="email">Email:</label>
              <input 
                  className='w-full outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150' 
                  name='email' 
                  id='email'
                  title='email'
                  type="email" 
                  onChange={e => setUserEmail(e.target.value)}
                  required />
            </div>
            <div className='flex flex-col text-center'>
              <label className='text-2xl font-semibold' htmlFor="username">Username:</label>
              <input 
                  className='w-full outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150' 
                  name='username' 
                  id='username'
                  title='username'
                  type="text" 
                  onChange={e => setUserName(e.target.value)}
                  required />
            </div>
            <div className='flex flex-col items-center text-center'>
              <label className='text-2xl font-semibold' htmlFor="password">Password:</label>
              <input 
                className='w-full outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150'
                name='password'
                id='password'
                title='password' 
                type={state.inputType} 
                onChange={e => handleChangeInput(e.target.value)}
                required />
                { 
                  state.passwordChecker
                  && 
                  <PasswordChecker 
                    passwordText={state.passwordText}
                    textColor={state.changeColor} /> 
                } 
                { 
                  showPass 
                  && 
                  <ShowPasswordButton 
                    checker={checker}
                    setChecker={setChecker}
                    dispatch={dispatch}
                    type={state.inputType} />
                }
            </div>
            { loading && <h1 className='font-bold text-center text-blue-500 text-xl animate-bounce'>Loading...</h1> }
            <input 
              className='bg-green-300 hover:bg-green-500 text-white font-semibold cursor-pointer p-2 rounded-md duration-150' 
              type="submit" 
              value="SIGNUP"/>
          </form>
          <br />
          <BackButtons buttonText={'Back to Login'} />
      </div>
    </>
  )
}

export default Signup