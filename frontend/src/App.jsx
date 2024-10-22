import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage"; 
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ReserPasswordPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import GetTreatmentPage from './pages/GetTreatmentPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermasAndConditions from './pages/TermsAndConditions';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to='/login' replace />;
  if (!user.isVerified) return <Navigate to='/verify-email' replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) return <Navigate to='/get-treatment' replace />;
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  
  useEffect(() => { 
    checkAuth(); 
  }, [checkAuth]);

  
  if (isCheckingAuth) return null; 

  return (
    <div className='min-h-screen flex flex-col'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/get-treatment' element={<GetTreatmentPage />} />
        <Route path='/about-us' element={<AboutUsPage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermasAndConditions />} />
        <Route path='/dashboard' element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path='/signup' element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
        <Route path='/login' element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password' element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path='/reset-password/:token' element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
