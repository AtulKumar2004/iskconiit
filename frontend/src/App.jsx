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

function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/philosophy" element={<About />} />
        <Route path="/media" element={<MediaGallery />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/outreach/student" element={<StudentOutreach />} />
        <Route path="/outreach/corporate" element={<CorporateOutreach />} />
        <Route path="/outreach/faculty" element={<FacultyOutreach />} />
        <Route path="/outreach/village" element={<VillageOutreach />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
