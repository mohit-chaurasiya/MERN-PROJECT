import React from 'react'
import { Navigate } from "react-router-dom"

function RoleProtectedRoute({children, allowedRole}) {

 const token = localStorage.getItem("token")
 const role = localStorage.getItem("role")

 if(!token){
    return <Navigate to="/login" replace />   
 }

 if(role !== allowedRole){
    return <Navigate to="/" replace />
 }

  return children
}

export default RoleProtectedRoute
