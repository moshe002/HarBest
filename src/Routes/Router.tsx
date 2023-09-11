import { Route, Routes } from 'react-router-dom'; 

// pages
import Login from '../Pages/Login';
import Homepage from '../Pages/Homepage';
import Signup from '../Pages/Signup';

function Router() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/homepage' element={<Homepage />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
    </>
  )
}

export default Router