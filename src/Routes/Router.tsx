import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'; 
import { supabase } from '../supabase-config';

// pages
import Login from '../Pages/Login';
import Homepage from '../Pages/Homepage';
import Signup from '../Pages/Signup';
import Account from '../Pages/Account';

function Router() {
  
  const [session, setSession] = useState<boolean>(false)

  useEffect(() => {
    getSession()
  }, [session])

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()  
    if(data) {
      data.session != null ? setSession(true) : setSession(false)
      //console.log(data)
    }
    error && console.error(error)
  }

  console.log(session)
  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {
            session
            ?
            <>
              <Route path='/homepage' element={<Homepage />} />
              <Route path='/account' element={<Account />} />
            </>
            :
            <Route path='/invalid' element={<h1>Invalid</h1>} />
          }
        </Routes>
    </>
  )
}

export default Router