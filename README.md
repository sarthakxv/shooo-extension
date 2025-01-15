# Shooo! Extension

A simple Chrome extension to block distracting websites and redirect them to your preferred destination.

## Features
- Block websites using URLs or keywords by redirecting them to custom URL
- Simple and intuitive interface
- Lightweight and fast

## Installation
****
### From Source
1. Clone this repository

```bash
git clone https://github.com/sarthakxv/shooo-extension
cd shooo-extension
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load in Chrome
- Open Chrome and navigate to `chrome://extensions/`
- Enable "Developer mode" in the top right
- Click "Load unpacked"
- Select the `dist` folder from this project

### Development 💻

Run development server (for UI development):
```bash
npm run dev
```

Build in watch mode (for testing in Chrome):
```bash
npm run build:watch
```


## Usage 🚀

1. Click the FocusBlock icon in your Chrome toolbar
2. Set your preferred redirect URL (defaults to Google)
3. Add websites or keywords you want to block
4. Try accessing a blocked site - you'll be redirected automatically
