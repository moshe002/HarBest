import React, { useState, useReducer } from 'react' // useEffect
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabase-config';
import { reducer, defaultState } from '../Reducer/LoginSignupReducer';

import Header from '../Components/Header';
import ShowPasswordButton from '../Components/ShowPasswordButton'
import PasswordChecker from '../Components/PasswordChecker';
import InvalidUser from '../Components/InvalidUser';

interface LoginProps {
  setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login:React.FC<LoginProps> = ({ setSession }) => {

  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, defaultState)

  const [showPass, setShowPass] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [checker, setChecker] = useState<boolean>(false)
  const [checkUser, setCheckUser] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeInput = (pass:string) => {
    let inputText = pass
    setPassword(pass)
    inputText.length == 0 ? setShowPass(false) : setShowPass(true)
    if(inputText.length < 6) {
      dispatch({ type: 'password_checker', passwordChecker: true })
      dispatch({ type: 'change_password_text', passwordText: 'Password too short!' })
      dispatch({ type: 'change_text_color', changeColor: 'text-red-500' })
      setCheckUser(false)
    } else {
      dispatch({ type: 'change_password_text', passwordText: 'Password length is good.' })
      dispatch({ type: 'change_text_color', changeColor: 'text-green-500' })
    }
  }

  const handleLogin = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
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
      setSession(true)
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/homepage')
    }
    setLoading(false)
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
                      onChange={e => setEmail(e.target.value)}
                      required />
              </div>
              <div className='flex flex-col items-center text-center'>
                  <label className='text-2xl font-semibold' htmlFor="password">Password:</label>
                  <input 
                      className='outline-none p-1 text-center border-2 border-gray-300 focus:border-green-500 rounded-md duration-150'
                      name='password' 
                      id='password'
                      title='password' 
                      type={state.inputType} 
                      onChange={e => handleChangeInput(e.target.value)}
                      //maxLength={8}
                      //minLength={8}
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
                        type={state.inputType}
                        dispatch={dispatch} />
                    }
              </div>
              { loading && <h1 className='font-bold text-center text-gray-500 text-xl animate-bounce'>Loading...</h1> }
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