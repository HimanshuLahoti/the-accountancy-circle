
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "./components/layout/MainLayout";

import Index from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Replace with your Google Client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout><Index /></MainLayout>} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardLayout />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;
