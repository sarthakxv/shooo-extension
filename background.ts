import { StorageService } from './storage/storage';

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const settings = await StorageService.getSettings();
  
  const url = new URL(details.url);
  const shouldBlock = settings.blockedUrls.some(blockedUrl => 
    url.hostname.includes(blockedUrl) || url.pathname.includes(blockedUrl)
  );

  if (shouldBlock) {
    chrome.tabs.update(details.tabId, {
      url: settings.redirectUrl
    });
  }
});
