import { Routes, Route } from 'react-router-dom';

import HomePage from '../views/HomePage/homepage';
import About from '../views/About/about';
import Reality from '../views/Reality/reality';
import Gallery from '../views/Gallery/gallery';
import Donation from '../views/Donation/donation';
import Donate from '../donate';
import Donate2 from '../donate2';
import Donate3 from '../donate3';
import VnpayReturn from '../VNpayReturn';

import March13 from '../13march';
import Jan27 from '../27jan';
import Dec04 from '../04dec';
import Nov11 from '../11Nov';
import Dec23 from '../23dec';
import NewsDetail from '../views/NewsDetail/NewsDetail';

const AppRoutes = () => {
  return (
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
      <Route path="/news/:slug" element={<NewsDetail />} />

      <Route path="/trainning" element={<March13 />} />
      <Route path="/conferences" element={<Jan27 />} />
      <Route path="/release" element={<Dec04 />} />
      <Route path="/resued" element={<Nov11 />} />
      <Route path="/saving" element={<Dec23 />} />
    </Routes>
  );
};

export default AppRoutes;
