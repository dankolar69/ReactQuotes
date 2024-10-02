import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Context';

const AddQuote: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string>('');

  const handleAddQuote = async () => {
    const tagList = tags.split(',').map(tag => tag.trim());

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content, tags: tagList }),
      });

      if (response.ok) {
        const newQuote = await response.json();
        alert('Citát byl úspěšně přidán');
        setContent('');
        setTags('');
        // Můžete také aktualizovat seznam citátů nebo přesměrovat uživatele
      } else {
        const errorData = await response.json();
        alert(`Chyba při přidávání citátu: ${errorData}`);
      }
    } catch (error) {
      console.error('Chyba při přidávání citátu:', error);
      alert('Chyba při přidávání citátu. Zkuste to prosím znovu.');
    }
  };

  return (
    <div>
      <h2>Přidat nový citát</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Obsah citátu"
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tagy (oddělené čárkou)"
      />
      <button onClick={handleAddQuote}>Přidat citát</button>
    </div>
  );
};

export default AddQuote;