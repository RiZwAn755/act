
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login'
import Signup from './pages/signup'
import Dashboard from './pages/dashboard'
import PrivateComponent from './pages/privatecomponent'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PrivateComponent />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
