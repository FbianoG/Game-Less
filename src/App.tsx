import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Game from './pages/Game/Game';
import Libs from './pages/Libs/Libs';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/libs" element={<Libs />} />
      </Routes>
    </Router>
  )

}

export default App