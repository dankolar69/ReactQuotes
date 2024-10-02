import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/Context';

interface Quote {
  id: number;
  content: string;
  author: string;
}

const Quotes: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [tag, setTag] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
      const response = await fetch(`/api/quotes${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      } else {
        const errorData = await response.json();
        alert(`Chyba při načítání citátů: ${errorData}`);
      }
    } catch (error) {
      console.error('Chyba při načítání citátů:', error);
      alert('Chyba při načítání citátů. Zkuste to prosím znovu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  const handleRandomQuote = async () => {
    try {
      const query = tag ? `?tag=${encodeURIComponent(tag)}` : '';
      const response = await fetch(`/api/quotes/random${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const quote = await response.json();
        alert(`Náhodný citát: "${quote.content}" - ${quote.author}`);
      } else {
        const errorData = await response.json();
        alert(`Chyba při získávání náhodného citátu: ${errorData}`);
      }
    } catch (error) {
      console.error('Chyba při získávání náhodného citátu:', error);
      alert('Chyba při získávání náhodného citátu. Zkuste to prosím znovu.');
    }
  };

  return (
    <div>
      <h2>Citáty</h2>
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Filtrovat podle tagu"
      />
      <button onClick={fetchQuotes} disabled={loading}>
        {loading ? 'Načítání...' : 'Načíst citáty'}
      </button>
      <button onClick={handleRandomQuote}>Náhodný citát</button>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            "{quote.content}" - {quote.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quotes;