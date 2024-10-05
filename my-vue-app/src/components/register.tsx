import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Hesla se neshodují');
      return;
    }

    try {
      const response = await fetch('http://localhost:5136/swagger/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Ujistěte se, že backend vrací token po registraci
        if (token) {
          login(token);
          alert('Registrace úspěšná');
          navigate('/quotes'); // Přesměrování po úspěšné registraci
        }
      } else {
        const errorData = await response.json();
        alert(`Registrace selhala: ${errorData}`);
      }
    } catch (error) {
      console.error('Chyba při registraci:', error);
      alert('Registrace selhala. Zkuste to prosím znovu.');
    }
  };

  return (
    <div>
      <h2>Registrace</h2>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Potvrďte heslo"
      />
      <button onClick={handleRegister}>Registrovat se</button>
    </div>
  );
};

export default Register;