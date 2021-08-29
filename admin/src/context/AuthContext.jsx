import React, { useState, useEffect } from "react"
import {
  authSignUp,
  authLogin,
  authLogout,
  CheckIsAuthenticated,
} from "../services/auth"

export const AuthContext = React.createContext({})

export default function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    setIsLoading(false)
    // setIsAuthenticated(true)

    CheckIsAuthenticated()
      .then((result) => {
        setIsLoading(false)
        console.log("exito")

        if (result.success) {
          setUser(result.user)
          console.log(result.success)
          console.log(result.user)

          // console.log(result)
          // console.log(result.success)

          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          return false
        }
      })
      .catch(() => {
        setIsAuthenticated(false)
        setIsLoading(false)
      })
  }

  const login = (credentials) => {
    return authLogin(credentials)
      .then((result) => {
          console.log(credentials)
          setUser({
            id: result.user.id,
            name: result.user.name,
          })

          setIsAuthenticated(true)
          return true
      })
      .catch((error) => {
        setIsAuthenticated(false)
        return false
      })
  }

  const logout = () => {
    authLogout()
    setIsAuthenticated(false)
  }

  const signUp = (credentials) => {
    return authSignUp(credentials)
      .then((result) => {
        return result.success
      })
      .catch((error) => {
        alert(error)
        setIsAuthenticated(false)
      })
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, signUp, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
