import './App.css'
import Home from './home/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginCard from './login/login'
import SignUp from './signUp/signUp'

function App() {
 
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginCard />} />
      <Route path="/signUp" element={<SignUp/>}/>
    </Routes>
  </Router>

  )
}

export default App
