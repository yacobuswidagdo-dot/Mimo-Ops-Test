import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './Layout'
import RequestListPage from './pages/RequestListPage'
import IntakeFormPage from './pages/IntakeFormPage'
import RequestDetailPage from './pages/RequestDetailPage'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/requests" replace />} />
            <Route path="requests" element={<RequestListPage />} />
            <Route path="requests/new" element={<IntakeFormPage />} />
            <Route path="requests/:id" element={<RequestDetailPage />} />
            <Route path="*" element={<Navigate to="/requests" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
