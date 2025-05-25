import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const firstRun = useRef(true);

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.background = '#0d1117';
    
  }, []);

  // Load from local storage on mount
  useEffect( () => {
    try {
      const stored = localStorage.getItem('webshelf-links');
      if(stored) {
        setLinks(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load links from storage:', e);
      setLinks([]); // fallback to empty list
    }
  }, [] );

  // Save to localStorage whenever links update
  useEffect( () => {
    if(firstRun.current) {
      firstRun.current = false;
      return; //skip saving first time
    }

    localStorage.setItem('webshelf-links', JSON.stringify(links))
  }, [links] );

  const addLink = () => {
    if (!url) return; //simple validation

    //Normalize URL: add https:// if missing
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;

    }

    setLinks([...links, { url: formattedUrl, desc }]);
    setUrl('');
    setDesc('');
  };

  const deleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0d1117',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{ 
          margin: '0 auto',
          maxWidth: 600, 
          width: '100%',
          padding: '40px 30px',
          background: '#161b22',
          color: '#c9d1d9',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Segoe UI, sans-serif',
          boxSizing: 'border-box'
        }}>
        <h1 style={{ marginBottom: 20, color: '#c9d1d9' }}>WebShelf - Save your links</h1>

        <input
          type="text"
          placeholder='Enter website URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #30363d',
            fontSize: '1em',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}
        />

        <input
          type="text"
          placeholder='Enter a short description'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '12px',
            borderRadius: '8px',
            border: '1px solid #30363d',
            fontSize: '1em',
            backgroundColor: '#0d1117',
            color: '#c9d1d9',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' 
          }}
        />

        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '20px'
        }}
        >
          <button 
            onClick={addLink} 
            style={{ 
              backgroundColor: '#238636',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '1em',
              cursor: 'pointer'  
            }}>
            Add Link
          </button>
        </div>


        <ul style={{ marginTop: 20, listStyle: 'none', padding: 0 }}>
          {links.map((link, i) => (
            <li 
              key={i} 
              style={{ 
                background: '#161b22',
                color: '#c9d1d9',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid #30363d',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)'
              }}
            >

              {/* Link URL */}
              <div>

              <a
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#58a6ff', textDecoration: 'underline' }}
              >
                {link.url}
              </a>
                <div style={{ fontSize: '0.9em', color: '#8b949e', marginTop: 4 }}>
                  {/* Link description */}
                - {link.desc}
                </div>
              </div>
              

              
              
              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteLink(i)}
                style={{ 
                  background: '#bd2c00',
                  color: '#fff',
                  border: 'none',
                  padding: '5px 10px', 
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
    
  );
}