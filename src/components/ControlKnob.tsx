import React from 'react';
import classNames from 'classnames';

interface ControlKnobProps {
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export const ControlKnob: React.FC<ControlKnobProps> = ({
  icon,
  value,
  onChange,
  label,
}) => {
  const rotation = (value / 100) * 270 - 135; // -135 to 135 degrees

  return (
    <div className="flex flex-col items-center">
      <div className="text-gray-200 mb-2">{icon}</div>
      <div className="relative w-12 h-12">
        <div
          className={classNames(
            "absolute w-full h-full rounded-full border-4 border-gray-700",
            "transform transition-transform cursor-pointer hover:scale-110",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}
          style={{ transform: `rotate(${rotation}deg)` }}
          onClick={() => onChange(value === 100 ? 0 : value + 10)}
        >
          <div className="absolute top-0 left-1/2 w-1 h-3 bg-gray-200 transform -translate-x-1/2" />
        </div>
      </div>
      <span className="text-sm text-gray-200 mt-2">{label}</span>
    </div>
  );
};