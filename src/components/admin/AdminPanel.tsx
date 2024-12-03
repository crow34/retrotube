import React, { useState } from 'react';
import { Lock, Plus, Trash2, Save, Database, Power } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { useTVStore } from '../../store/tvStore';
import { AdminLogin } from './AdminLogin';

export const AdminPanel: React.FC = () => {
  const { isAuthenticated, isAdminOpen, toggleAdmin, logout } = useAdminStore();
  const { channels, addChannel, removeChannel, updateChannel, useFirebase, setUseFirebase, toggleAutopilot } = useTVStore();
  const [newChannel, setNewChannel] = useState({ name: '', playlist: '' });

  if (!isAdminOpen) {
    return (
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700"
      >
        <Lock className="w-6 h-6 text-gray-200" />
      </button>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const handleAddChannel = () => {
    const playlistIds = newChannel.playlist.split(',').map(id => id.trim());
    addChannel(newChannel.name, playlistIds);
    setNewChannel({ name: '', playlist: '' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Channel Management</h2>
          <div className="space-x-2">
            <button
              onClick={() => setUseFirebase(!useFirebase)}
              className={`px-4 py-2 ${
                useFirebase ? 'bg-blue-600' : 'bg-gray-600'
              } text-white rounded hover:opacity-90 flex items-center gap-2`}
            >
              <Database className="w-4 h-4" />
              {useFirebase ? 'Using Firebase' : 'Using Local Storage'}
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
            <button
              onClick={toggleAdmin}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {channels.map(channel => (
            <div key={channel.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <input
                type="text"
                value={channel.name}
                onChange={(e) => {
                  updateChannel(channel.id, e.target.value, channel.playlist.map(v => v.id));
                }}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                onClick={() => toggleAutopilot(channel.id)}
                className={`p-2 ${
                  channel.autopilot ? 'text-green-600' : 'text-gray-400'
                } hover:text-green-700`}
                title="Toggle Autopilot"
              >
                <Power className="w-5 h-5" />
              </button>
              <button
                onClick={() => removeChannel(channel.id)}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="text"
              placeholder="Channel Name"
              value={newChannel.name}
              onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="Playlist IDs (comma-separated)"
              value={newChannel.playlist}
              onChange={(e) => setNewChannel({ ...newChannel, playlist: e.target.value })}
              className="flex-1 px-2 py-1 border rounded"
            />
            <button
              onClick={handleAddChannel}
              className="p-2 text-blue-600 hover:text-blue-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};