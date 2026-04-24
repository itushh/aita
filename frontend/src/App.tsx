import React from "react"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Analyze from "./pages/Analyze"
import Header from "./components/Header"
import BorderedCard from "./components/BorderedCard"
import AuthPage from "./pages/AuthPage"
import AboutPage from "./pages/AboutPage"
import AccountPage from "./pages/AccountPage"
import LandingPage from "./pages/LandingPage"
import { AuthProvider, useAuth } from "./lib/AuthContext"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/auth" />;

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <div className="min-h-dvh max-w-300 mx-auto flex flex-col text-foreground font-sans px-4 sm:px-6 md:px-8">
      <div className="sticky top-2 z-50">
        <BorderedCard>
          <Header />
        </BorderedCard>
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<div className="flex-1 flex justify-center items-center">Contact</div>} />
        <Route path="*" element={<div className="flex-1 flex justify-center items-center">404 | Not Found</div>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App