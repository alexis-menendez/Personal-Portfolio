// File: client/src/App.tsx

// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth
import { AuthProvider } from './context/authContext';

// Layout
import ProtectedRoute from './components/ProtectedRoute';
import PortfolioLayout from './components/portfolio/layout/PortfolioLayout';
import PsychedelicLayout from './components/portfolio/layout/PsychedelicLayout';

    // innerOrbit Layouts
    import IOLoginLayout from './components/innerOrbit/layout/IOLoginLayout';
    import IOMainLayout from './components/innerOrbit/layout/IOmainLayout/IOMainLayout';
    import IOJournalLayout from './components/innerOrbit/layout/IOJournalLayout';

// Pages
import Home from './pages/portfolio/Home';
import Projects from './pages/portfolio/Projects';
import DontDie from './pages/portfolio/DontDie';
import InnerOrbit from './pages/portfolio/InnerOrbit';
import Lattice from './pages/portfolio/Lattice';
import Solarium from './pages/portfolio/Solarium';
import Runestone from './pages/portfolio/Runestone';
import Taskadelic from './pages/portfolio/Taskadelic';
import Contact from './pages/portfolio/Contact';

    // innerOrbit Pages
    import IOHome from './pages/innerOrbit/IOHome';
    import Dashboard from './pages/innerOrbit/IODashboard';
    import Journal from './pages/innerOrbit/Journal';
    import Tracker from './pages/innerOrbit/Tracker';
    import Library from './pages/innerOrbit/Library';
    import UserProfile from './pages/innerOrbit/IOUserProfile';

// Components
import NavBar from './components/portfolio/layout/NavBar';
import Footer from './components/portfolio/layout/Footer';
import FooterWhite from './components/portfolio/layout/FooterWhite';

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
        {/* Routes using PortfolioLayout */}
        <Route element={<PortfolioLayout />}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/innerOrbit" element={<InnerOrbit />} />
          <Route path="/dontDie" element={<DontDie />} />
          <Route path="/lattice" element={<Lattice />} />
          <Route path="/solarium" element={<Solarium />} />
          <Route path="/runestone" element={<Runestone />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Routes using PsychedelicLayout */}
        <Route element={<PsychedelicLayout />}>
          <Route path="/taskadelic" element={<Taskadelic />} />
        </Route>
        
        {/* Routes using IOLoginLayout */} 
        <Route element={<IOLoginLayout />}>
          <Route path="/io-home" element={<IOHome />} />
          <Route path="/io-login" element={<IOLogin />} />
          <Route path="/io-register" element={<IORegister />} />
          <Route path="/io-terms" element={<IOTerms />} />
          <Route path="/io-privacy" element={<IOPrivacy />} />
        </Route>

        {/* Routes using IOMainLayout */}
        <Route element={<IOMainLayout />}>
          <Route path="/io-dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/io-tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
          <Route path="/io-library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path="/io-account" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/io-dev-constellations" element={<DevelopConstellations />} />
          <Route path="/io-dev-stars" element={<DevStars />} />
        </Route>

        {/* Routes using IOJournalLayout */}
        <Route path="/io-journal" element={<ProtectedRoute><IOJournalLayout /></ProtectedRoute>}>
          <Route index element={<Journal />} />
          <Route path="constellation/:index" element={<Constellation />} />
          <Route path="entry/:entryId" element={<ViewJournal />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
