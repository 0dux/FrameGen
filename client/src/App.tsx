import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LenisScroll from "./components/LenisScroll";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "./globals.css";
import Generate from "./pages/Generate";
import HomePage from "./pages/HomePage";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";

export default function App() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/generate/:id" element={<Generate />} />
        <Route path="/my-generation" element={<MyGeneration />} />
        <Route path="/yt-preview" element={<YtPreview />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}
