# Quick Start Guide

## Prerequisites
- Python 3.7+
- Node.js and npm
- Chrome browser

## Step-by-Step Setup

### 1. Install Dependencies

**Backend:**
```bash
cd Scraping-UI/backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd Scraping-UI
npm install
```

### 2. Start Chrome with Remote Debugging

**Windows (PowerShell):**
```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="$env:TEMP\chrome_debug"
```

**macOS/Linux:**
```bash
# macOS
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="$HOME/temp/chrome_debug"

# Linux
google-chrome --remote-debugging-port=9222 --user-data-dir="$HOME/temp/chrome_debug"
```

### 3. Start Backend Server (UK-Scraping API)

**Windows:**
```bash
cd UK-Scraping
start_api.bat
```

**macOS/Linux:**
```bash
cd UK-Scraping
chmod +x start_api.sh
./start_api.sh
```

Or manually:
```bash
cd UK-Scraping
python api_server.py
```

### 4. Start Frontend

In a new terminal:
```bash
cd Scraping-UI
npm start
```

The web UI will open at `http://localhost:3000`

## Using the UI

1. **Disable JavaScript**: Check the "Disable JavaScript" checkbox to disable JavaScript in Chrome (similar to Chrome DevTools setting)

2. **Start Scraping**: Click "Start Scraping" to begin the automation

3. **Monitor Status**: Watch the status panel for real-time updates

4. **Stop Scraping**: Click "Stop Scraping" to stop the running script

## Troubleshooting

- **Backend not connecting**: Make sure Flask is running on port 5000
- **JavaScript toggle not working**: Ensure Chrome is started with `--remote-debugging-port=9222`
- **Script not found**: Verify `UK-Scraping/script.py` exists in the project root

