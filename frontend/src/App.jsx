import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Donation from "./components/Donation";
import MediaGallery from "./pages/MediaGallery";
import StudentOutreach from "./pages/StudentOutreach";
import CorporateOutreach from "./pages/CorporateOutreach";
import FacultyOutreach from "./pages/FacultyOutreach";
import VillageOutreach from "./pages/VillageOutreach";
import Programs from "./pages/Programs.jsx";
import Contact from "./pages/Contact.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import Govindas from "./pages/Govindas.jsx";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="font-body">
      <Toaster position="top-center" richColors />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/philosophy" element={<About />} />
        <Route path="/media" element={<MediaGallery />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/outreach/student" element={<StudentOutreach />} />
        <Route path="/outreach/corporate" element={<CorporateOutreach />} />
        <Route path="/outreach/faculty" element={<FacultyOutreach />} />
        <Route path="/outreach/village" element={<VillageOutreach />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/govindas" element={<Govindas />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
