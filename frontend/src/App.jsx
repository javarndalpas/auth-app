
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { useState } from 'react'
import { RefreshHandler } from './pages/RefreshHandler'

function App() {
  const [isAuthanticated,setIsAuthanticated] = useState(false);

  const  PrivateRoute =({ element })=>{
    return isAuthanticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
    <RefreshHandler setIsAuthanticated={setIsAuthanticated} />
      <Routes>
        <Route path="/" element={ <Navigate to="/login"/> } />
        <Route path="/home" element={ <PrivateRoute element={<Home/>}/> } />
        <Route path="/login" element={ <Login/> } />
        <Route path="/signup" element={ <Signup/> } />
      </Routes>
    </>
  )
}

export default App
