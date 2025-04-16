import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServiceRequest from './pages/ServiceRequest';
import LiveTracking from './pages/LiveTracking';
import PaymentInvoice from './pages/PaymentInvoice';
import RatingsFeedback from './pages/RatingsFeedback';
import ProfileHistory from './pages/ProfileHistory';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/servicerequest" element={<ServiceRequest />}/>
                    <Route path="/live-tracking" element={<LiveTracking />} />
                    <Route path="/payment-invoice" element={<PaymentInvoice />} />
                    <Route path="/ratings-feedback" element={<RatingsFeedback />} />
                    <Route path="/profile-history" element={<ProfileHistory />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <Footer/>
        </div>
    );
}

export default App;
