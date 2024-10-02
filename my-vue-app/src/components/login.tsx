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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Ujistěte se, že backend vrací token
        if (token) {
          login(token);
          alert('Přihlášení úspěšné');
          navigate('/quotes'); // Přesměrování po úspěšném přihlášení
        }
      } else {
        const errorData = await response.json();
        alert(`Přihlášení selhalo: ${errorData}`);
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