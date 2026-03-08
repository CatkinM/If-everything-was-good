import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Essay from './pages/Essay';
import Gate from './pages/Gate';
import Admin from './pages/Admin';
import EditEssay from './pages/EditEssay';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/essay/:id" element={<Essay />} />
        <Route path="/gate" element={<Gate />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/new" element={<EditEssay />} />
        <Route path="/admin/edit/:id" element={<EditEssay />} />
      </Routes>
    </BrowserRouter>
  );
}
