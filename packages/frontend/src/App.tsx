import './App.css'
import Home from './home/home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginCard from './login/login'
import SignUp from './signUp/signUp'
import Stories from './stories/stories'
import {
  RecoilRoot,
} from 'recoil';

function App() {
 
  return (
    <RecoilRoot>
      <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginCard />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/signUp" element={<SignUp/>}/>
    </Routes>
  </Router>
    </RecoilRoot>
    

  )
}

export default App
