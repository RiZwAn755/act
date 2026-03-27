import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

const PrivateComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    let isMounted = true

    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
        })

        if (!response.ok) {
          if (isMounted) {
            setIsAuthenticated(false)
            localStorage.removeItem('authUser')
          }
          return
        }

        const data = await response.json()
        if (isMounted) {
          localStorage.setItem('authUser', JSON.stringify(data.user))
          setIsAuthenticated(true)
        }
      } catch (error) {
        if (isMounted) {
          setIsAuthenticated(false)
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [])

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-slate-950" />
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateComponent