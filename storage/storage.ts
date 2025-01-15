export interface BlockerSettings {
  blockedUrls: string[];
  redirectUrl: string;
}

const defaultSettings: BlockerSettings = {
  blockedUrls: [],
  redirectUrl: 'https://google.com'
};

export const StorageService = {
  /**
   * Get all blocker settings
   */
  getSettings: async (): Promise<BlockerSettings> => {
    try {
      const settings = await chrome.storage.sync.get(defaultSettings);
      return settings as BlockerSettings;
    } catch (error) {
      console.error('Error getting settings:', error);
      return defaultSettings;
    }
  },

  /**
   * Save all blocker settings
   */
  saveSettings: async (settings: BlockerSettings): Promise<void> => {
    try {
      await chrome.storage.sync.set(settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  },

  /**
   * Add a URL to blocked list
   */
  addBlockedUrl: async (url: string): Promise<string[]> => {
    try {
      const settings = await StorageService.getSettings();
      if (!settings.blockedUrls.includes(url)) {
        settings.blockedUrls.push(url);
        await StorageService.saveSettings(settings);
      }
      return settings.blockedUrls;
    } catch (error) {
      console.error('Error adding blocked URL:', error);
      return [];
    }
  },

  /**
   * Remove a URL from blocked list
   */
  removeBlockedUrl: async (url: string): Promise<string[]> => {
    try {
      const settings = await StorageService.getSettings();
      settings.blockedUrls = settings.blockedUrls.filter(u => u !== url);
      await StorageService.saveSettings(settings);
      return settings.blockedUrls;
    } catch (error) {
      console.error('Error removing blocked URL:', error);
      return [];
    }
  },

  /**
   * Update redirect URL
   */
  updateRedirectUrl: async (url: string): Promise<void> => {
    try {
      const settings = await StorageService.getSettings();
      settings.redirectUrl = url;
      await StorageService.saveSettings(settings);
    } catch (error) {
      console.error('Error updating redirect URL:', error);
    }
  },

  /**
   * Clear all settings
   */
  clearSettings: async (): Promise<void> => {
    try {
      await chrome.storage.sync.clear();
    } catch (error) {
      console.error('Error clearing settings:', error);
    }
  }
};