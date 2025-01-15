import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { StorageService, BlockerSettings } from '../storage/storage';
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
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await StorageService.getSettings();
    setBlockedUrls(settings.blockedUrls);
    setRedirectUrl(settings.redirectUrl);
  };

  const handleAddUrl = async () => {
    if (newUrl) {
      const updatedUrls = await StorageService.addBlockedUrl(newUrl);
      setBlockedUrls(updatedUrls);
      setNewUrl('');
    }
  };

  const handleRemoveUrl = async (urlToRemove: string) => {
    const updatedUrls = await StorageService.removeBlockedUrl(urlToRemove);
    setBlockedUrls(updatedUrls);
  };

  const handleRedirectUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRedirectUrl = e.target.value;
    setRedirectUrl(newRedirectUrl);
    await StorageService.updateRedirectUrl(newRedirectUrl);
  };

  // const saveSettings = (newBlockedUrls: string[], newRedirectUrl: string) => {
  //   chrome.storage.sync.set({
  //     blockedUrls: newBlockedUrls,
  //     redirectUrl: newRedirectUrl
  //   });
  // };

  return (
    <div className="popup">
      <h2>Shooo! Blocker</h2>
      
      <div className="redirect-section">
        <label>Redirect to:</label>
        <input 
          type="url" 
          value={redirectUrl}
          onChange={handleRedirectUrlChange}
          placeholder="https://google.com"
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