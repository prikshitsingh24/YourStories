import './App.css'
import Home from './home/home'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom'
import LoginCard from './login/login'
function App() {
 
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginCard />} />
    </Routes>
  </Router>

  )
}

export default App
