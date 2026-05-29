import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Donation from "./components/Donation";
import MediaGallery from "./pages/MediaGallery";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
