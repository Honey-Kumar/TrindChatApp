import React, { lazy, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import ProtectedRoute from './component/Auth/ProtectedRoute'
import { Suspense } from 'react'
import Loading from './utils/Loading'
import { ToastContainer } from 'react-toastify'
import Forgetpassword from './pages/Forgetpassword'
import Resetpassword from './pages/Resetpassword'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const Home = lazy(() => import('./pages/Home'))
const Chats = lazy(() => import('./pages/Chats'))
const Groups = lazy(() => import('./pages/Groups'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  const { isLoggedin , isLoggedout} = useSelector(state => state.Auth)
  const [istoken, setistoken] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const tokenFromCookie = Cookies.get('authtoken')
    console.log("auth token : ", tokenFromCookie)
    if (tokenFromCookie) {
      setistoken(true)
    } else {
      setistoken(false)
    }
    console.log("istoken : ", istoken)
    return () => controller.abort()
  }, [isLoggedin, isLoggedout])
  return (
    <>
      <Router>
        <ToastContainer />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<ProtectedRoute user={istoken} />}>
              <Route path='/' element={<Home />} />
              <Route path='/chat/:id' element={<Chats />} />
              <Route path='/group' element={<Groups />} />
            </Route>

            <Route
              path='/login'
              element={istoken ? <Navigate to='/' /> : <Login />}
            />
            <Route path='/forget' element={<Forgetpassword />} />
            <Route path='/resetpassword/:token' element={<Resetpassword />} />

          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
