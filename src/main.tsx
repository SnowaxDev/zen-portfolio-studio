
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import Lucide icons to ensure they're available
import { FileCode2, Terminal, Laptop, CodeIcon, MousePointer2, Package, Rocket, Crown, Clock, ArrowRight, Check } from 'lucide-react'

createRoot(document.getElementById("root")!).render(<App />);
