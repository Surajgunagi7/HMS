import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Appointment, DoctorSearch, RequestCallForm, LandingPage } from './pages';
import { Navigation } from './components';

function App() {
  return (
    <Router>
      <Navigation />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctors" element={<DoctorSearch />} />
          <Route path="/request-call" element={<RequestCallForm />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;