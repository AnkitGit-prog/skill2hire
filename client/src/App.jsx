import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import JobDetails from './pages/JobDetails';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import AdminLogin from './pages/AdminLogin';
import ResumeScorer from './pages/ResumeScorer';
import Jobs from './pages/Jobs';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-scorer" element={<ResumeScorer />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/govt-jobs" element={<Jobs type="Govt" />} />
            <Route path="/private-jobs" element={<Jobs type="Private" />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
