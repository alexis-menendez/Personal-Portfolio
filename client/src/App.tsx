// File: client/src/App.tsx

// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth
import { AuthProvider } from './context/authContext';

// Layout
import ProtectedRoute from './components/ProtectedRoute';

    // innerOrbit Layouts
    import IOLoginLayout from './components/innerOrbit/layout/IOLoginLayout';
    import IOMainLayout from './components/innerOrbit/layout/IOmainLayout/IOMainLayout';
    import IOJournalLayout from './components/innerOrbit/layout/IOJournalLayout';

// Pages
// TODO: import Home from './pages/portfolio/Home';
// TODO: import About from './pages/portfolio/About';
// TODO: import Contact from './pages/portfolio/Contact';
// TODO: import Portfolio from './pages/portfolio/Portfolio';
// TODO: import Resume from './pages/portfolio/Resume';

    // innerOrbit Pages
    import Home from './pages/innerOrbit/IOHome';
    import Dashboard from './pages/innerOrbit/IODashboard';
    import Journal from './pages/innerOrbit/Journal';
    import Tracker from './pages/innerOrbit/Tracker';
    import Library from './pages/innerOrbit/Library';
    import UserProfile from './pages/innerOrbit/IOUserProfile';

// Components
// TODO: import Navigation from './components/portfolio/NavBar';
// TODO: import Footer from './components/portfolio/Footer';

    // innerOrbit Components
    import IOLogin from './components/innerOrbit/pageComponents/login/IOLoginForm';
    import IORegister from './components/innerOrbit/pageComponents/login/IORegisterForm';
    import IOTerms from './components/innerOrbit/pageComponents/login/IOTerms';
    import IOPrivacy from './components/innerOrbit/pageComponents/login/IOPrivacy';
    import Constellation from './components/innerOrbit/pageComponents/journal/Constellation';
    import ViewJournal from './components/innerOrbit/pageComponents/journal/ViewJournal'; 

// Development components (for internal use)

    // innerOrbit Development Components (for internal use)
    import DevelopConstellations from './components/innerOrbit/pageComponents/journal/dev/DevelopConstellations'; 
    import DevStars from './components/innerOrbit/pageComponents/journal/dev/DevStars'; 


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Routes using IOLoginLayout */}
        <Route element={<IOLoginLayout />}>
          <Route path="/" element={<Home />} />
            <Route path="/io-login" element={<IOLogin />} />
            <Route path="/io-register" element={<IORegister />} />
              <Route path="/io-terms" element={<IOTerms />} />
              <Route path="/io-privacy" element={<IOPrivacy />} />
        </Route>

        {/* Routes using IOMainLayout */}
        <Route element={<IOMainLayout />}>
          <Route path="/io-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>}/>
            <Route path="/library"element={<ProtectedRoute><Library /></ProtectedRoute>}/>
            <Route path="/io-account" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
              <Route path="/dev-constellations" element={<DevelopConstellations />} /></Route>
              <Route path="/dev-stars" element={<DevStars />} />

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
