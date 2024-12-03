import React from 'react';

export const EPGTimeSlots: React.FC = () => {
  const currentHour = new Date().getHours();
  const timeSlots = Array.from({ length: 6 }, (_, i) => {
    const hour = (currentHour + i) % 24;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="grid grid-cols-6 gap-2">
      {timeSlots.map((time) => (
        <div key={time} className="text-center p-2 border border-green-500">
          {time}
        </div>
      ))}
    </div>
  );
};