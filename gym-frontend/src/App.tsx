import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from './pages/Styles/GlobalStyles'
import AppRoutes from './routes'
import AuthProvider from './Contexts/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
