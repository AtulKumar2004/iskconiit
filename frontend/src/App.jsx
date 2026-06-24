import React, { Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Loader from "./components/Loader";

// Lazy loaded pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Donation = React.lazy(() => import("./components/Donation"));
const MediaGallery = React.lazy(() => import("./pages/MediaGallery"));
const StudentOutreach = React.lazy(() => import("./pages/StudentOutreach"));
const CorporateOutreach = React.lazy(() => import("./pages/CorporateOutreach"));
const FacultyOutreach = React.lazy(() => import("./pages/FacultyOutreach"));
const VillageOutreach = React.lazy(() => import("./pages/VillageOutreach"));
const Programs = React.lazy(() => import("./pages/Programs.jsx"));
const Contact = React.lazy(() => import("./pages/Contact.jsx"));
const PaymentSuccess = React.lazy(() => import("./pages/PaymentSuccess.jsx"));
const Govindas = React.lazy(() => import("./pages/Govindas.jsx"));
const Library = React.lazy(() => import("./pages/Library.jsx"));

function App() {
  return (
    <div className="font-body">
      <Toaster position="top-center" richColors />
      <Navbar />
      <Suspense fallback={<Loader />}>
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
          <Route path="/library" element={<Library />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
