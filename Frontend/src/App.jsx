import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout/Layout';
import ScrollToTop from './components/UI/ScrollToTop';
import Home from './pages/Home';
import Doctors from './pages/Doctors.jsx';
import Appointment from './pages/Appointment';
import RequestCall from './pages/RequestCall';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="appointment" element={<Appointment />} />
              <Route path="request-call" element={<RequestCall />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ScrollToTop />
        </div>
      </Router>
    </Provider>
  );
}

export default App;