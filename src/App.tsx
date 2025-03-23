
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { EmotionProvider } from './contexts/EmotionContext';
import Index from './pages/Index';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { Toaster as SonnerToaster } from 'sonner';
import './App.css';

function App() {
  return (
    <EmotionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
      <Toaster />
      <SonnerToaster position="top-right" />
    </EmotionProvider>
  );
}

export default App;
