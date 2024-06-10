import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/LandingPage';
import Projects from './components/Projects';
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaDev } from "react-icons/fa6";
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));

function Portfolio() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`flex flex-col min-h-screen ${theme === 'light' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`} id="theme">
        <div className="flex-grow max-w-full mx-[5%] px-4 py-8">
          <nav className='flex items-center justify-between gap-4'>
            <Link to={"/"}>
              <FaDev className='text-5xl'/>
            </Link>
            <div className='flex items-center justify-center gap-4'>
              <ul className="flex space-x-4">
                <li>
                  <Link to="/" className="bg-gray-700 text-white px-4 py-2 rounded hover:font-bold transition-all delay-150">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="bg-gray-700 text-white px-4 py-2 rounded hover:font-bold transition-all delay-150">About</Link>
                </li>
                <li>
                  <Link to="/projects" className="bg-gray-700 text-white px-4 py-2 rounded hover:font-bold transition-all delay-150">Projects</Link>
                </li>
                <li>
                  <Link to="/contact" className="bg-gray-700 text-white px-4 py-2 rounded hover:font-bold transition-all delay-150">Contact</Link>
                </li>
              </ul>
              <button
                onClick={toggleTheme}
                className="bg-gray-700 text-white px-4 py-3 rounded"
              >
                {theme === "light" ? <MdOutlineLightMode /> : <MdDarkMode />}
              </button>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <About />
                </Suspense>
              }
            />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Portfolio;
