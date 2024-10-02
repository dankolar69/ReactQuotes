import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/Context';
import Login from './components/login';
import Register from './components/register';
import Quotes from './components/quotes';
import AddQuote from './components/AddQuote';

const App: React.FC = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/quotes" replace />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/quotes" replace />} />
        <Route
          path="/quotes"
          element={token ? <Quotes /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-quote"
          element={token ? <AddQuote /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/quotes" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
