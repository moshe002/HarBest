import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'; 
//import { supabase } from '../supabase-config';

// pages
import Login from '../Pages/Login';
import Homepage from '../Pages/Homepage';
import Signup from '../Pages/Signup';
import Account from '../Pages/Account';

function Router() {
  
  const [session, setSession] = useState<boolean>(false)

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setSession(true);
    }
  }, []);

  // const getSession = async () => {
  //   const { data, error } = await supabase.auth.getSession()  
  //   if(data) {
  //     data.session != null ? setSession(true) : setSession(false)
  //     //console.log(data)
  //   }
  //   error && console.error(error)
  // }

  //console.log(session)
  return (
    <>
        <Routes>
          <Route path='/' element={<Login setSession={setSession} />} />
          <Route path='/signup' element={<Signup />} />
          {
            session
            &&
            <>
              <Route path='/homepage' element={<Homepage setSession={setSession} />} />
              <Route path='/account' element={<Account setSession={setSession} />} />
            </>
          }
        </Routes>
    </>
  )
}

export default Router