// File: client/src/App.tsx

// React
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Auth
import { AuthProvider } from './context/authContext';

// Layout
import ProtectedRoute from './components/ProtectedRoute';
import PortfolioLayout from './components/portfolio/layout/PortfolioLayout';
import PsychedelicLayout from './components/portfolio/layout/PsychedelicLayout';
import ResumeLayout from './components/portfolio/layout/ResumeLayout';
import GalleryLayout from './components/portfolio/layout/GalleryLayout';

    // innerOrbit Layouts
    const IOLoginLayout = lazy(() => import('./components/innerOrbit/layout/IOLoginLayout'));
    const IOMainLayout = lazy(() => import('./components/innerOrbit/layout/IOmainLayout/IOMainLayout'));
    const IOJournalLayout = lazy(() => import('./components/innerOrbit/layout/IOJournalLayout'));

// Pages
import Home from './pages/portfolio/Home';
   import Resume from './pages/portfolio/Resume';
import Projects from './pages/portfolio/Projects';
import Gallery from './pages/portfolio/Gallery';
   import DontDie from './pages/portfolio/DontDie';
   import InnerOrbit from './pages/portfolio/InnerOrbit';
   import Lattice from './pages/portfolio/Lattice';
   import Solarium from './pages/portfolio/Solarium';
   import Runestone from './pages/portfolio/Runestone';
   import Taskadelic from './pages/portfolio/Taskadelic';
import Contact from './pages/portfolio/Contact';

    // innerOrbit Pages
    const IOHome = lazy(() => import('./pages/innerOrbit/IOHome'));
    const Dashboard = lazy(() => import('./pages/innerOrbit/IODashboard'));
    const Journal = lazy(() => import('./pages/innerOrbit/Journal'));
    const Tracker = lazy(() => import('./pages/innerOrbit/Tracker'));
    const Library = lazy(() => import('./pages/innerOrbit/Library'));
    const UserProfile = lazy(() => import('./pages/innerOrbit/IOUserProfile'));

// Components
import PageLoader from './components/portfolio/common/PageLoader';
import NavBar from './components/portfolio/layout/NavBar';
import Footer from './components/portfolio/layout/Footer';
import FooterWhite from './components/portfolio/layout/FooterWhite';

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
  const [pageLoading, setPageLoading] = React.useState(true);

  React.useEffect(() => {
    const handleLoad = () => setPageLoading(false);

    if (document.readyState === 'complete') {
      // Already loaded
      handleLoad();
    } else {
      // Wait until load
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (pageLoading) return <PageLoader />; // full-screen animation

  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </AuthProvider>
  );
};

export default App;
