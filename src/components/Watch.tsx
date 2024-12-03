import React from 'react';
import { TVFrame } from './TVFrame';

export const Watch: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <TVFrame />
    </div>
  );
};