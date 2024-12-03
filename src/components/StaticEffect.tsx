import React from 'react';

export const StaticEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-static animate-static">
      <div className="absolute inset-0 bg-black opacity-20" />
    </div>
  );
};