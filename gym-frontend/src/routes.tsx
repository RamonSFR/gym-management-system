import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import MembersHome from './pages/MembersHome'
import EmployeeHome from './pages/EmployeeHome'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/members/:id" element={<MembersHome />} />
    <Route path="/employees/:id" element={<EmployeeHome />} />
  </Routes>
)

export default AppRoutes
