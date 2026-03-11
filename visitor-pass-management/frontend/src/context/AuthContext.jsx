import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token")

        if(token){
            setUser({token})
        }
    },[])

    const login = (data) => {
        localStorage.setItem("token",data.token)

        setUser(data)
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}