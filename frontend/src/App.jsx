import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/common/Toaster';

import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import Calendar from './pages/Calendar';
import IdeasBank from './pages/IdeasBank';
import Settings from './pages/Settings';
import Search from './pages/Search';
import Login from './pages/Login';
import Resources from './pages/Resources';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="library" element={<Library />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="ideas" element={<IdeasBank />} />
            <Route path="resources" element={<Resources />} />
            <Route path="settings" element={<Settings />} />
            <Route path="search" element={<Search />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
