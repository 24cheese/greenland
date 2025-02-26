import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import './index.css';
import HomePage from './homepage';
import About from './about';
import Donation from './donation';
import Reality from './reality';
import Gallery from './gallery';
import Donate from './donate'
import Donate2 from './donate2';
import Donate3 from './donate3'
import VnpayReturn from './VNpayReturn';
import March13 from './13march'
import Jan27 from './27jan';
import Dec04 from './04dec';
import Nov11 from './11Nov';
import Dec23 from './23dec';

import './i18n';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Scroll to head of page
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/reality" element={<Reality />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/donate" element={<Donation />} />
        <Route path="/payment/project1" element={<Donate />} />
        <Route path="/payment/project2" element={<Donate2 />} />
        <Route path="/payment/project3" element={<Donate3 />} />
        <Route path="/vnpay_return" element={<VnpayReturn />} />

        <Route path="/trainning" element={<March13 />} />
        <Route path="/conferences" element={<Jan27 />} />
        <Route path="/release" element={<Dec04 />} />
        <Route path="/resued" element={<Nov11 />} />
        <Route path="/saving" element={<Dec23 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
