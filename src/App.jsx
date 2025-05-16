import React, { useState } from 'react';

export default function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  const addLink = () => {
    if (!url) return; //simple validation

    //Normalize URL: add https:// if missing
    let formattedUrl = url;
    if (!/^https?;\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;

    }
    console.log('Formatted URL: ', formattedUrl); //DEBUG

    setLinks([...links, { url: formattedUrl, desc }]);
    setUrl('');
    setDesc('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>WebShelf - Save your links</h1>

      <input
        type="text"
        placeholder='Enter website URL'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder='Enter a short description'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <button onClick={addLink} style={{ padding: '8px 16px' }}>
        Add Link
      </button>

      <ul style={{ marginTop: 20 }}>
        {links.map((link, i) => (
          <li key={i} style={{ marginBottom: 10 }}>
            <a
              href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.url}
            </a>
            {' '}
            - {link.desc}
          </li>
        ))}

      </ul>
    </div>
  );
}