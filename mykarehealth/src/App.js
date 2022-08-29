
import './App.css';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Register from './components/Register'
function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/sign-up' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
