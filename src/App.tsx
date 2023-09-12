import { BrowserRouter } from 'react-router-dom';

import Router from './Routes/Router';

function App() {

  return (
    <BrowserRouter>
        <div className="flex flex-col h-screen w-full">
          <Router />
        </div>
    </BrowserRouter>
  )
}

export default App
