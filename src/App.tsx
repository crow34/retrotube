import React from 'react';
import { EPGGuide } from './components/epg/EPGGuide';
import { AdminPanel } from './components/admin/AdminPanel';

function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 p-4 font-mono">
      <EPGGuide />
      <AdminPanel />
    </div>
  );
}

export default App;