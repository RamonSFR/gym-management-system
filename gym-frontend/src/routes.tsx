import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import MembersHome from './pages/MembersHome'
import Employees from './pages/Employees'

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/members/:id' element={<MembersHome />} />
        <Route path="/employees" element={<Employees />} />
    </Routes>
)

export default AppRoutes
