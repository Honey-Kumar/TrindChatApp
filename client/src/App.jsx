import React, { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './component/Auth/ProtectedRoute'
import { Suspense } from 'react'
import Loading from './utils/Loading'

const Home = lazy(() => import('./pages/Home'))
const Chats = lazy(() => import('./pages/Chats'))
const Groups = lazy(() => import('./pages/Groups'))
const Login = lazy(() => import('./pages/Login'))

const App = () => {
  let user = true
  return (
    <>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<Chats />} />
              <Route path='/group' element={<Groups />} />
            </Route>

            <Route path='/login' element={<Login />} />

          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App
