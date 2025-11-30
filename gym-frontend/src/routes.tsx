import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import MembersHome from './pages/MembersHome'

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/members' element={<MembersHome />} />
    </Routes>
)

export default AppRoutes
