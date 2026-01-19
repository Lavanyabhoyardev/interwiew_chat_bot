// // src/App.jsx
// // Main application component for the Interview Bot UI
// import React from 'react';
// import { ChatProvider } from './contexts/ChatContext';
// import Chatbot from "./Chatbot";
// import ErrorBoundary from './components/ErrorBoundary';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navigation from './components/Navigation';
// import ResumeAnalyzer from './pages/ResumeAnalyzer';
// import TechChatbot from './components/TechChatbot';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navigation />
//         <ToastContainer 
//           position="top-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
        
//         <main className="container mx-auto px-4 py-8">
//           <Routes>
//             <Route path="/" element={<ResumeAnalyzer />} />
//             <Route path="/chat" element={<TechChatbot />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;



// src/App.jsx
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation';
import FeatureNavigation from './components/FeatureNavigation';
import TechChatbot from './components/TechChatbot';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import SmartQuestionGeneration from './pages/SmartQuestionGeneration';
import InstantFeedback from './pages/InstantFeedback';
import RealTimeAnalysis from './pages/RealTimeAnalysis';
import Company from './pages/Company';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import LegalPage from './pages/LegalPage';
import Profile from './pages/Profile.jsx';
import EditProfile from './pages/EditProfile.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Pricing from './pages/Pricing.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import MinimalResumeAnalyzer from './MinimalResumeAnalyzer.jsx';

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname;
  const isHome = pathname === '/';
  const isSmartQuestions = pathname === '/smart-questions';
  const isDarkPage = ['/instant-feedback', '/real-time-analysis'].includes(pathname);
  const showFeatureNav = false; // Removed FeatureNavigation from all pages
  
  return (
    <div className={isHome || isSmartQuestions || isDarkPage ? 'min-h-screen' : 'min-h-screen bg-gray-50'}>
      <Navigation />
      {showFeatureNav ? <FeatureNavigation /> : null}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<TechChatbot />} />
        <Route path="/resume-analyzer" element={
          <ProtectedRoute>
            <ResumeAnalyzer />
          </ProtectedRoute>
        } />
        <Route path="/resume-analyzer-minimal" element={
          <ProtectedRoute>
            <MinimalResumeAnalyzer />
          </ProtectedRoute>
        } />
        <Route path="/smart-questions" element={
          <ProtectedRoute>
            <SmartQuestionGeneration />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        } />
        <Route path="/profile/change-password" element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/company" element={<Company />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<LegalPage />} />
          <Route path="/instant-feedback" element={
            <ProtectedRoute>
              <InstantFeedback />
            </ProtectedRoute>
          } />
          <Route path="/real-time-analysis" element={
            <ProtectedRoute>
              <RealTimeAnalysis />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
