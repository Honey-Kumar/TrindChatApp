import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({ element, user, redirect = '/login' }) => {
    console.log(element)
    if (!user) {
        return <Navigate to={redirect} />
    }

    return element ? element : <Outlet />
}

export default ProtectedRoute
