import React, { useState, useEffect } from 'react';

interface ScrapingStatus {
  running: boolean;
  status: string;
  message: string;
  javascript_disabled: boolean;
  last_update: number | null;
}

// API is served from UK-Scraping folder
const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [javascriptDisabled, setJavascriptDisabled] = useState(false);
  const [status, setStatus] = useState<ScrapingStatus>({
    running: false,
    status: 'idle',
    message: 'Ready to start',
    javascript_disabled: false,
    last_update: null
  });
  const [loading, setLoading] = useState(false);

  // Poll for status updates
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/status`);
        const data = await response.json();
        setStatus(data);
        setJavascriptDisabled(data.javascript_disabled || false);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 2000); // Poll every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const handleJavascriptToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/javascript`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disable: checked }),
      });

      const data = await response.json();
      if (data.success) {
        setJavascriptDisabled(checked);
      } else {
        alert(data.message || 'Failed to change JavaScript setting');
      }
    } catch (error) {
      console.error('Error toggling JavaScript:', error);
      alert('Failed to connect to backend. Make sure the Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || 'Failed to start scraping');
      }
    } catch (error) {
      console.error('Error starting scraping:', error);
      alert('Failed to connect to backend. Make sure the Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/stop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.message || 'Failed to stop scraping');
      }
    } catch (error) {
      console.error('Error stopping scraping:', error);
      alert('Failed to connect to backend. Make sure the Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status.status) {
      case 'running':
      case 'starting':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'stopped':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = () => {
    switch (status.status) {
      case 'running':
      case 'starting':
        return '🟢';
      case 'completed':
        return '✅';
      case 'error':
        return '❌';
      case 'stopped':
        return '⏸️';
      default:
        return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          UK Scraping Control Panel
        </h1>

        {/* JavaScript Toggle Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <label
                htmlFor="javascript-toggle"
                className="text-lg font-medium text-gray-700 cursor-pointer"
              >
                Disable JavaScript
              </label>
              <span className="text-sm text-gray-500">
                (Similar to Chrome DevTools setting)
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="javascript-toggle"
                checked={javascriptDisabled}
                onChange={(e) => handleJavascriptToggle(e.target.checked)}
                disabled={loading || status.running}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {javascriptDisabled
              ? 'JavaScript is currently disabled in Chrome'
              : 'JavaScript is currently enabled in Chrome'}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={handleStart}
            disabled={loading || status.running}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              status.running || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 active:scale-95'
            }`}
          >
            {loading ? 'Processing...' : 'Start Scraping'}
          </button>
          <button
            onClick={handleStop}
            disabled={loading || !status.running}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              !status.running || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 active:scale-95'
            }`}
          >
            {loading ? 'Processing...' : 'Stop Scraping'}
          </button>
        </div>

        {/* Status Display */}
        <div className={`p-6 rounded-lg border-2 ${getStatusColor()}`}>
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-2xl">{getStatusIcon()}</span>
            <h2 className="text-xl font-semibold">Status</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">State:</span>
              <span className="uppercase font-semibold">{status.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Running:</span>
              <span>{status.running ? 'Yes' : 'No'}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-current border-opacity-20">
              <span className="font-medium block mb-2">Message:</span>
              <p className="text-sm">{status.message}</p>
            </div>
            {status.last_update && (
              <div className="mt-2 text-xs opacity-75">
                Last updated: {new Date(status.last_update * 1000).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
            <li>Start Chrome with remote debugging: <code className="bg-blue-100 px-1 rounded">--remote-debugging-port=9222</code></li>
            <li>Toggle JavaScript setting if needed</li>
            <li>Click "Start Scraping" to begin the automation</li>
            <li>Monitor the status below</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;