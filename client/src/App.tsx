// File: client/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Layout
import LoginLayout from './components/innerOrbit/layout/LoginLayout';
import MainLayout from './components/innerOrbit/layout/MainLayout';
import JournalLayout from './components/innerOrbit/layout/JournalLayout';
import ProtectedRoute from './components/innerOrbit/layout/ProtectedRoute';

// Pages
import Home from './pages/innerOrbit/Home';
import Dashboard from './pages/innerOrbit/Dashboard';
import Journal from './pages/innerOrbit/Journal';
import Tracker from './pages/innerOrbit/Tracker';
import Library from './pages/innerOrbit/Library';
import UserProfile from './pages/innerOrbit/UserProfile';

// Components
import Login from './components/innerOrbit/home/LoginForm';
import Register from './components/innerOrbit/home/RegisterForm';
import Terms from './components/innerOrbit/home/Terms';
import Privacy from './components/innerOrbit/home/Privacy';
import Constellation from './components/innerOrbit/journal/Constellation';
import ViewJournal from './components/innerOrbit/journal/ViewJournal'; 

// Development components (for internal use)
import DevelopConstellations from './components/innerOrbit/journal/dev/DevelopConstellations'; 
import DevStars from './components/innerOrbit/journal/dev/DevStars'; 

// TODO pages (not yet created):                 
// import NotFound from './pages/NotFound';                --->  not yet created

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes using LoginLayout */}
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Routes using MainLayout */}
        <Route element={<MainLayout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tracker"
            element={
              <ProtectedRoute>
                <Tracker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/dev/constellations" 
          element={
          <DevelopConstellations />} />
        </Route>

          <Route path="/dev/stars" element={<DevStars />} />

        {/* Journal routes using JournalLayout */}
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Journal />} />
          <Route path="constellation/:index" element={<Constellation />} />
          <Route path="entry/:entryId" element={<ViewJournal />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
