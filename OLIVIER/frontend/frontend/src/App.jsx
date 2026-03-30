import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Toaster } from './components/common/Toaster'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Calendar from './pages/Calendar'
import IdeasBank from './pages/IdeasBank'
import Settings from './pages/Settings'
import BlockEditorDemo from './pages/BlockEditorDemo'
import Search from './pages/Search'
import Updates from './pages/Updates'
import MainLayoutNotion from './components/layout/Notion/MainLayoutNotion'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/login" />
}

const pageVariants = {
    initial: { opacity: 0, y: 12 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -8 },
}

const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.25,
}

const AnimatedPage = ({ children }) => (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="h-full"
    >
        {children}
    </motion.div>
)

function AppContent() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/login"
                    element={
                        <AnimatedPage>
                            <Login />
                        </AnimatedPage>
                    }
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <MainLayoutNotion />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<AnimatedPage><Dashboard /></AnimatedPage>} />
                    <Route path="dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
                    <Route path="library" element={<AnimatedPage><Library /></AnimatedPage>} />
                    <Route path="calendar" element={<AnimatedPage><Calendar /></AnimatedPage>} />
                    <Route path="ideas" element={<AnimatedPage><IdeasBank /></AnimatedPage>} />
                    <Route path="editor" element={<AnimatedPage><BlockEditorDemo /></AnimatedPage>} />
                    <Route path="settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
                    <Route path="search" element={<AnimatedPage><Search /></AnimatedPage>} />
                    <Route path="updates" element={<AnimatedPage><Updates /></AnimatedPage>} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
            <Toaster />
        </AuthProvider>
    )
}

export default App
