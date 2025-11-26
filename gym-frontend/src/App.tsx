import { BrowserRouter } from 'react-router-dom'

import GlobalStyles from './pages/Styles/GlobalStyles'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
