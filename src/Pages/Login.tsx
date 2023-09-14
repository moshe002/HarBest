import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabase-config';

import Header from '../Components/Header';
import ShowPasswordButton from '../Components/ShowPasswordButton'
import PasswordChecker from '../Components/PasswordChecker';
import InvalidUser from '../Components/InvalidUser';

function Login() {

  const navigate = useNavigate();

  const [showPass, setShowPass] = useState<boolean>(false)
  const [changeType, setChangeType] = useState<string>('password')
  const [checker, setChecker] = useState<boolean>(false)
  const [passwordText, setPasswordText] = useState<string>('Password must be equal to or greater than 6 characters.')
  const [passwordChecker, setPasswordChecker] = useState<boolean>(false)
  const [passwordColor, setPasswordColor] = useState<string>('')
  const [checkUser, setCheckUser] = useState<boolean>(false)

  const handleChangeInput = (e:React.SyntheticEvent) => {
    let inputText = e.target.value
    inputText.length == 0 ? setShowPass(false) : setShowPass(true)
    if(inputText.length < 6) {
      setPasswordChecker(true)
      setPasswordText('Password too short!')
      setPasswordColor('text-red-500')
      setCheckUser(false)
    } else {
      setPasswordText('Password length is good.')
      setPasswordColor('text-green-500')
    }
  }

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: e.target.email.value,
      password: e.target.password.value,
    })
    let checker:boolean = false
    if(data){
      //console.log(data)
      checker = true
    }
    if(error){
      console.error(error)
      checker = false
      setCheckUser(true)
    }
    //console.log('form submitted')
    if(checker){
      navigate('/homepage')
    }
  }

  return (
    <>
      <Header />
      <div className='flex flex-col items-center justify-center h-screen'>
          { checkUser && <InvalidUser /> }
          <br />
          <form onSubmit={handleLogin} className='flex flex-col gap-5 border-2 p-5 rounded-md'>
              <div className='flex flex-col text-center'>
                  <label className='text-2xl font-semibold' htmlFor="email">Email:</label>
                  <input 
                      className='outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150' 
                      name='email' 
                      id='email'
                      title='email' 
                      type="email" 
                      required />
              </div>
              <div className='flex flex-col items-center text-center'>
                  <label className='text-2xl font-semibold' htmlFor="password">Password:</label>
                  <input 
                      className='outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150'
                      name='password' 
                      id='password'
                      title='password' 
                      type={changeType} 
                      onChange={handleChangeInput}
                      //maxLength={8}
                      //minLength={8}
                      required />
                    {
                      passwordChecker
                      &&
                      <PasswordChecker 
                        passwordText={passwordText}
                        passwordColor={passwordColor} />
                    }
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
    </>
  )
}

export default Login