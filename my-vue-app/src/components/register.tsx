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
      const response = await fetch('http://localhost:5136/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const token = data.acccesstoken; // Ujistěte se, že backend vrací token po registraci
        console.log(token);
        login(token);
        navigate('/quotes');
      }
    } catch (error) {/*
      console.error('Chyba při registraci:', error);
      alert('Registrace selhala. Zkuste to prosím znovu.');*/
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