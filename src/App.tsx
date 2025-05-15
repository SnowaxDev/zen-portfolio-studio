
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProjectDetails from './pages/ProjectDetails';
import NotFound from './pages/NotFound';
import GradientBackground from './components/GradientBackground';
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      {/* Apply gradient background to the entire app */}
      <GradientBackground />
      
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      
      <Toaster />
    </>
  );
}

export default App;
