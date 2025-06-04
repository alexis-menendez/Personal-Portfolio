// File: client/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

// Layout
import ProtectedRoute from './components/ProtectedRoute';

    // innerOrbit Layouts
    import IOLoginLayout from './components/innerOrbit/layout/IOLoginLayout';
    import IOMainLayout from './components/innerOrbit/layout/IOMainLayout';
    import IOJournalLayout from './components/innerOrbit/layout/IOJournalLayout';

// Pages
// TODO: import Home from './pages/portfolio/Home';
// TODO: import About from './pages/portfolio/About';
// TODO: import Contact from './pages/portfolio/Contact';
// TODO: import Portfolio from './pages/portfolio/Portfolio';
// TODO: import Resume from './pages/portfolio/Resume';

    // innerOrbit Pages
    import Home from './pages/innerOrbit/Home';
    import Dashboard from './pages/innerOrbit/Dashboard';
    import Journal from './pages/innerOrbit/Journal';
    import Tracker from './pages/innerOrbit/Tracker';
    import Library from './pages/innerOrbit/Library';
    import UserProfile from './pages/innerOrbit/UserProfile';

// Components
// TODO: import Navigation from './components/portfolio/NavBar';
// TODO: import Footer from './components/portfolio/Footer';

    // innerOrbit Components
    import Login from './components/innerOrbit/home/LoginForm';
    import Register from './components/innerOrbit/home/RegisterForm';
    import Terms from './components/innerOrbit/home/Terms';
    import Privacy from './components/innerOrbit/home/Privacy';
    import Constellation from './components/innerOrbit/journal/Constellation';
    import ViewJournal from './components/innerOrbit/journal/ViewJournal'; 

// Development components (for internal use)
import DevelopConstellations from './components/innerOrbit/journal/dev/DevelopConstellations'; 
import DevStars from './components/innerOrbit/journal/dev/DevStars'; 

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes using IOLoginLayout */}
        <Route element={<IOLoginLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
        </Route>

        {/* Routes using IOMainLayout */}
        <Route element={<IOMainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>}/>
          <Route path="/library"element={<ProtectedRoute><Library /></ProtectedRoute>}/>
          <Route path="/account" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
          <Route path="/dev/constellations" element={<DevelopConstellations />} /></Route>
          <Route path="/dev/stars" element={<DevStars />} />

        {/* Journal routes using IOJournalLayout */}
        <Route path="/journal" element={<ProtectedRoute><IOJournalLayout /></ProtectedRoute>}><Route index element={<Journal />} />
          <Route path="constellation/:index" element={<Constellation />} />
          <Route path="entry/:entryId" element={<ViewJournal />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
