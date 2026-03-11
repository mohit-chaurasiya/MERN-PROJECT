import { Navigate } from "react-router-dom";

import React from 'react'

export const ProtectedRoute = ({children}) => {

    const token = localStorage.getItem("token")

    if(!token){
        return <Navigate to="/login" replace/>
    }

  return children 
}
