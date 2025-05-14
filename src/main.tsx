
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Lucide icons to ensure they're available globally
import { 
  FileCode2, 
  Terminal, 
  Laptop, 
  Code, 
  MousePointer2, 
  Package, 
  Rocket, 
  Crown, 
  Clock, 
  ArrowRight, 
  Check, 
  Briefcase, 
  Database, 
  Layers,
  Server,
  Layout,
  Cpu,
  Zap,
  ChevronDown,
  ChevronUp,
  Shield,
  Search,
  Smartphone,
  Sparkles,
  Palette,
  Plus,
  ArrowLeft
} from 'lucide-react'

createRoot(document.getElementById("root")!).render(<App />);
