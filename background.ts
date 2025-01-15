interface BlockerConfig {
  blockedUrls: string[];
  redirectUrl: string;
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  const { blockedUrls, redirectUrl } = await chrome.storage.sync.get({
    blockedUrls: [],
    redirectUrl: 'https://google.com'
  }) as BlockerConfig;

  const url = new URL(details.url);
  const shouldBlock = blockedUrls.some(blockedUrl => 
    url.hostname.includes(blockedUrl) || url.pathname.includes(blockedUrl)
  );

  if (shouldBlock) {
    chrome.tabs.update(details.tabId, {
      url: redirectUrl
    });
  }
});