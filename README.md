# Scraping UI - UK Scraping Control Panel

A simple web interface to control the UK Scraping automation script.

## Features

- ✅ Toggle JavaScript enable/disable in Chrome (similar to DevTools setting)
- ✅ Start and Stop scraping automation
- ✅ Real-time status display
- ✅ Clean and modern UI

## Setup

### 1. Install Backend Dependencies

The backend is in the `UK-Scraping` folder:

```bash
cd UK-Scraping
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies

```bash
cd Scraping-UI
npm install
```

## Running the Application

### Step 1: Start Chrome with Remote Debugging

Before starting the application, you need to start Chrome with remote debugging enabled:

**Windows:**
```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%TEMP%\chrome_debug"
```

**macOS:**
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir="$HOME/temp/chrome_debug"
```

Or use the provided script:
```bash
cd UK-Scraping
chmod +x start_chrome_debug.sh
./start_chrome_debug.sh
```

**Linux:**
```bash
google-chrome --remote-debugging-port=9222 --user-data-dir="$HOME/temp/chrome_debug"
```

### Step 2: Start the Backend Server (UK-Scraping API)

In one terminal:

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

The backend will run on `http://localhost:5000`

### Step 3: Start the Frontend

In another terminal:
```bash
cd Scraping-UI
npm start
```

The frontend will open at `http://localhost:3000`

## Usage

1. **Toggle JavaScript**: Use the checkbox to enable/disable JavaScript in Chrome (similar to Chrome DevTools → Settings → Debugger → Disable JavaScript)

2. **Start Scraping**: Click the "Start Scraping" button to begin the automation script

3. **Stop Scraping**: Click the "Stop Scraping" button to stop the running script

4. **Monitor Status**: The status panel shows:
   - Current state (idle, running, completed, error, stopped)
   - Whether scraping is running
   - Status messages
   - Last update time

## API Endpoints

The API server is located in `UK-Scraping/api_server.py`:

- `GET /api/status` - Get current scraping status
- `POST /api/javascript` - Toggle JavaScript (body: `{"disable": true/false}`)
- `POST /api/start` - Start scraping
- `POST /api/stop` - Stop scraping

## Troubleshooting

### Backend Connection Error
- Make sure the Flask API server is running on port 5000
- Check that Chrome is started with `--remote-debugging-port=9222`

### JavaScript Toggle Not Working
- Ensure Chrome is running with remote debugging enabled
- Check that port 9222 is accessible
- Verify Chrome DevTools Protocol is available

### Scraping Script Not Found
- Make sure `UK-Scraping/script.py` exists in the same folder as `api_server.py`

