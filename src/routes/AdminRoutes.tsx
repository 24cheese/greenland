import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '../dashboard';
import ManageAnimals from '../admin/views/manage_animals';
import AdminLayout from '../layouts/AdminLayout';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/manage-animal" element={<ManageAnimals />} />
    </Routes>
  );
};

export default AdminRoutes;
