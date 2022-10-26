import './App.css';
import LoginAnSignUp from './pages/LognAndSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginAnSignUp />} ></Route>
        <Route path='/hello' element={<Dashboard />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
