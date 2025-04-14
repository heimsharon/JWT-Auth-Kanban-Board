// Path: client/src/App.tsx
// This file is used to define the main App component

import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
