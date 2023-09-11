import { BrowserRouter } from 'react-router-dom';

import Header from "./Components/Header"

import Router from './Routes/Router';

function App() {

  return (
    <BrowserRouter>
        <div className="flex flex-col h-screen w-full">
          <Header />
          <Router />
        </div>
    </BrowserRouter>
  )
}

export default App
