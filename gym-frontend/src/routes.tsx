import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Employees from './pages/Employees'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home/employees" element={<Employees />} />
  </Routes>
)

export default AppRoutes
