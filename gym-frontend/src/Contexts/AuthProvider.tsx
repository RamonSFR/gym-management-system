import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  user: Member | Employee | null
  signin: (user: Member | Employee) => void
  signout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Member | Employee | null>(() => {
    try {
      const raw = sessionStorage.getItem('user')
      return raw ? (JSON.parse(raw) as Member | Employee) : null
    } catch (e) {
      console.error(`Failed to parse user from sessionStorage: ${e}`)
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) sessionStorage.setItem('user', JSON.stringify(user))
      else sessionStorage.removeItem('user')
    } catch (e) {
      console.error(`Failed to serialize user to sessionStorage: ${e}`)
    }
  }, [user])

  const signin = (u: Member | Employee) => setUser(u)
  const signout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthProvider
