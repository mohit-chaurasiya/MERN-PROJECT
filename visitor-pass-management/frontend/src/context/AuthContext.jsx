import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)


    useEffect(()=>{
        const token = localStorage.getItem("token")
        const name = localStorage.getItem("name")

        if(token){
            setUser({token, name})
        }
    },[])

    const login = (data) => {
        localStorage.setItem("token",data.token)
        localStorage.setItem("name",data.name)

        setUser(data)
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("role")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}