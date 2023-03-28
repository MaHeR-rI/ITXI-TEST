import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Artist from './components/Artist';
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {authCtx.isLoggedIn ? <Route path='/' element={<Search />} /> : <Route path='/' element={<Login />} />}
        {authCtx.isLoggedIn && <Route exact path={'/Artist/:id'} element={<Artist />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
export default App;
