
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GradientBackground from "./components/GradientBackground";

// Use lazy loading for non-critical routes
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Page transition wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/projects/:id" element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Načítání...</div>}>
            <ProjectDetails />
          </Suspense>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// Separate the App component to ensure hooks are only called inside components
const AppContent = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <GradientBackground />
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

// Main App component that wraps everything with QueryClientProvider
const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
