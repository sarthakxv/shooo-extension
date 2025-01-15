import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';

interface BlockerConfig {
  blockedUrls: string[];
  redirectUrl: string;
}

const Popup: React.FC = () => {
  const [blockedUrls, setBlockedUrls] = useState<string[]>([]);
  const [redirectUrl, setRedirectUrl] = useState<string>('https://google.com');
  const [newUrl, setNewUrl] = useState<string>('');

  useEffect(() => {
    // Load saved settings
    chrome.storage.sync.get({
      blockedUrls: [],
      redirectUrl: 'https://google.com'
    }, (items: BlockerConfig) => {
      setBlockedUrls(items.blockedUrls);
      setRedirectUrl(items.redirectUrl);
    });
  }, []);

  const saveSettings = (newBlockedUrls: string[], newRedirectUrl: string) => {
    chrome.storage.sync.set({
      blockedUrls: newBlockedUrls,
      redirectUrl: newRedirectUrl
    });
  };

  const handleAddUrl = () => {
    if (newUrl) {
      const updatedUrls = [...blockedUrls, newUrl];
      setBlockedUrls(updatedUrls);
      setNewUrl('');
      saveSettings(updatedUrls, redirectUrl);
    }
  };

  const handleRemoveUrl = (urlToRemove: string) => {
    const updatedUrls = blockedUrls.filter(url => url !== urlToRemove);
    setBlockedUrls(updatedUrls);
    saveSettings(updatedUrls, redirectUrl);
  };

  const handleRedirectUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRedirectUrl = e.target.value;
    setRedirectUrl(newRedirectUrl);
    saveSettings(blockedUrls, newRedirectUrl);
  };

  return (
    <div className="popup">
      <h2>Shooo! Blocker</h2>
      
      <div className="redirect-section">
        <label>Redirect to:</label>
        <input 
          type="url" 
          value={redirectUrl}
          onChange={handleRedirectUrlChange}
          placeholder="https://example.com"
        />
      </div>

      <div className="block-section">
        <div className="add-url">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Enter URL or keyword to block"
          />
          <button onClick={handleAddUrl}>Add</button>
        </div>

        <ul className="blocked-list">
          {blockedUrls.map(url => (
            <li key={url}>
              {url}
              <button onClick={() => handleRemoveUrl(url)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);