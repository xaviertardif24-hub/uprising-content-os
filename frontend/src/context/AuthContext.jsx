import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check for stored token on mount
        const token = localStorage.getItem('token')
        if (token) {
            // Decode token or fetch user data here
            setUser({ email: 'olivier@business.com', name: 'Olivier' })
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        // Mock login logic
        if (email === 'olivier@business.com' && password === 'password') {
            const mockToken = 'mock-jwt-token'
            localStorage.setItem('token', mockToken)
            setUser({ email, name: 'Olivier' })
            return { success: true }
        }
        return { success: false, error: 'Invalid credentials' }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
