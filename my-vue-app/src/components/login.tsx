import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5136/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.accessToken; // Backend by měl vracet accessToken

        // Uložení tokenu do localStorage
        localStorage.setItem('userToken', JSON.stringify(token));

        // Uložení přihlášeného uživatele do localStorage
        localStorage.setItem('userData', JSON.stringify(data));

        // Navigace na chráněnou stránku po přihlášení (např. dashboard)
        login(token);
        navigate('/quotes');
      } else {
        const errorData = await response.json();
        alert(`Přihlášení selhalo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Chyba při přihlášení:', error);
      alert('Přihlášení selhalo. Zkuste to prosím znovu.');
    }
  };

  return (
    <div>
      <h2>Přihlášení</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Heslo"
      />
      <button onClick={handleLogin}>Přihlásit se</button>
    </div>
  );
};

export default Login;
