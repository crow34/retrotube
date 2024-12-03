import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';

export const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login, toggleAdmin } = useAdminStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(credentials.username, credentials.password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            type="button"
            onClick={toggleAdmin}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};