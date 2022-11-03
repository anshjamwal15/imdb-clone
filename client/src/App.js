import './App.css';
import LoginAnSignUp from './pages/LognAndSignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginAnSignUp />} ></Route>
        <Route path='/' element={<ProtectedRoute Component={Dashboard} />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
