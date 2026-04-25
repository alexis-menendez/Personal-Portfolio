// File: client/src/App.tsx

// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Auth
import { AuthProvider } from './context/authContext';
import { HNTDAuthProvider } from './context/HNTDAuthContext';
import { HNTDPlanetProvider } from './context/HNTDPlanetContext';
import HNTDPrivateRoute from './components/dontDie/HNTDPrivateRoute';

// HNTD Pages
const HNTDHome           = lazy(() => import('./pages/dontDie/HNTDHome'));
const HNTDDashboard      = lazy(() => import('./pages/dontDie/HNTDDashboard'));
const HNTDHolomap        = lazy(() => import('./pages/dontDie/HNTDHolomap'));
const HNTDPersonalLogs   = lazy(() => import('./pages/dontDie/HNTDPersonalLogs'));
const HNTDSurvivalGuide  = lazy(() => import('./pages/dontDie/HNTDSurvivalGuide'));
const HNTDWeatherScanner = lazy(() => import('./pages/dontDie/HNTDWeatherScanner'));

// Layout
import ProtectedRoute from './components/ProtectedRoute';
import RetroLayout from './components/portfolio/layout/RetroLayout';
import PortfolioLayout from './components/portfolio/layout/PortfolioLayout';
import PsychedelicLayout from './components/portfolio/layout/PsychedelicLayout';
import ResumeLayout from './components/portfolio/layout/ResumeLayout';
import GalleryLayout from './components/portfolio/layout/GalleryLayout';

    // innerOrbit Layouts
    const IOLoginLayout = lazy(() => import('./components/innerOrbit/layout/IOLoginLayout'));
    const IOMainLayout = lazy(() => import('./components/innerOrbit/layout/IOmainLayout/IOMainLayout'));
    const IOJournalLayout = lazy(() => import('./components/innerOrbit/layout/IOJournalLayout'));

    // Taskadelic Layout + Pages
    const TaskadelicLayout  = lazy(() => import('./components/taskadelic/TaskadelicLayout'));
    const TDLogin           = lazy(() => import('./pages/taskadelic/TDLogin'));
    const TDBoard           = lazy(() => import('./pages/taskadelic/TDBoard'));
    const TDCreateTicket    = lazy(() => import('./pages/taskadelic/TDCreateTicket'));
    const TDEditTicket      = lazy(() => import('./pages/taskadelic/TDEditTicket'));

// Pages
import DevHome from './pages/portfolio/DevHome';
import UnderConstruction from './pages/portfolio/UnderConstruction';
import SpaceCity from './pages/portfolio/SpaceCity';
   import Resume from './pages/portfolio/Resume';
import Projects from './pages/portfolio/Projects';
   import DontDie from './pages/portfolio/DontDie';
   import InnerOrbit from './pages/portfolio/InnerOrbit';
   import Lattice from './pages/portfolio/Lattice';
   import Solarium from './pages/portfolio/Solarium';
   import Runestone from './pages/portfolio/Runestone';
   import Taskadelic from './pages/portfolio/Taskadelic';
     import Gallery from './pages/portfolio/Gallery';
import Contact from './pages/portfolio/Contact';

    // innerOrbit Pages
    const IOHome = lazy(() => import('./pages/innerOrbit/IOHome'));
    const Dashboard = lazy(() => import('./pages/innerOrbit/IODashboard'));
    const Journal = lazy(() => import('./pages/innerOrbit/Journal'));
    const Tracker = lazy(() => import('./pages/innerOrbit/Tracker'));
    const UserProfile = lazy(() => import('./pages/innerOrbit/IOUserProfile'));

// Components
// import NavBar from './components/portfolio/layout/NavBar';
// import Footer from './components/portfolio/layout/Footer';
// import FooterWhite from './components/portfolio/layout/FooterWhite';

    // innerOrbit Components
    const IOLogin = lazy(() => import('./components/innerOrbit/pageComponents/login/IOLoginForm'));
    const IORegister = lazy(() => import('./components/innerOrbit/pageComponents/login/IORegisterForm'));
    const IOTerms = lazy(() => import('./components/innerOrbit/pageComponents/login/IOTerms'));
    const IOPrivacy = lazy(() => import('./components/innerOrbit/pageComponents/login/IOPrivacy'));
    const Constellation = lazy(() => import('./components/innerOrbit/pageComponents/journal/Constellation'));
    const ViewJournal = lazy(() => import('./components/innerOrbit/pageComponents/journal/ViewJournal'));

// Development components (for internal use)
    // innerOrbit Development Components (for internal use)
    const DevelopConstellations = lazy(() => import('./components/innerOrbit/pageComponents/journal/dev/DevelopConstellations'));
    const DevStars = lazy(() => import('./components/innerOrbit/pageComponents/journal/dev/DevStars'));


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HNTDAuthProvider>
      <HNTDPlanetProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          
          {/* Routes using RetroLayout — no nav (under construction) */}
          <Route element={<RetroLayout showNav={false} showArch={false} />}>
            <Route index element={<UnderConstruction />} />
            <Route path="*" element={<UnderConstruction />} />
          </Route>

          {/* Routes using RetroLayout — with nav */}
          <Route element={<RetroLayout />}>
            <Route path="/dev-home" element={<DevHome />} />
          </Route>

          {/* /home — self-contained, no layout wrapper */}
          <Route path="/home" element={<SpaceCity />} />

          {/* HNTD demo routes */}
          <Route path="/hntd-home"            element={<HNTDHome />} />
          <Route path="/hntd-dashboard"       element={<HNTDPrivateRoute><HNTDDashboard /></HNTDPrivateRoute>} />
          <Route path="/hntd-holomap"         element={<HNTDPrivateRoute><HNTDHolomap /></HNTDPrivateRoute>} />
          <Route path="/hntd-survival-guide"  element={<HNTDPrivateRoute><HNTDSurvivalGuide /></HNTDPrivateRoute>} />
          <Route path="/hntd-weather-scanner" element={<HNTDPrivateRoute><HNTDWeatherScanner /></HNTDPrivateRoute>} />
          <Route path="/hntd-personal-logs"   element={<HNTDPrivateRoute><HNTDPersonalLogs /></HNTDPrivateRoute>} />

          {/* Standalone project detail pages */}
          <Route path="/innerOrbit" element={<InnerOrbit />} />
          <Route path="/taskadelic" element={<Taskadelic />} />
          <Route path="/dontDie" element={<DontDie />} />

          {/* Routes using PortfolioLayout */}
          <Route element={<PortfolioLayout />}>
            <Route path="/projects" element={<Projects />} />
            <Route path="/lattice" element={<Lattice />} />
            <Route path="/solarium" element={<Solarium />} />
            <Route path="/runestone" element={<Runestone />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Taskadelic demo routes */}
          <Route element={<TaskadelicLayout />}>
            <Route path="/td-home"   element={<TDLogin />} />
            <Route path="/td-board"  element={<TDBoard />} />
            <Route path="/td-create" element={<TDCreateTicket />} />
            <Route path="/td-edit"   element={<TDEditTicket />} />
          </Route>

          {/* Routes using PsychedelicLayout — reserved for future use */}

          {/* Routes using ResumeLayout */}
          <Route element={<ResumeLayout />}>
            <Route path="/resume" element={<Resume />} />
          </Route>

          {/* Routes using GalleryLayout */}
          <Route element={<GalleryLayout />}>
            <Route path="/gallery" element={<Gallery />} />
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
      </Suspense>
      </HNTDPlanetProvider>
      </HNTDAuthProvider>
    </AuthProvider>
  );
};

export default App;
