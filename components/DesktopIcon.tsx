
import React from 'react';
import { WindowId } from '../types';

interface DesktopIconProps {
  id: WindowId;
  title: string;
  icon: string;
  onClick: (id: WindowId) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ id, title, icon, onClick }) => {
  return (
    <div
      className="desktop-icon-card w-full max-w-[230px] sm:w-32 m-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white/70"
      onDoubleClick={() => onClick(id)}
      onTouchEnd={() => onClick(id)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick(id);
        }
      }}
      role="button"
      tabIndex={0}
      title={title}
      aria-label={title}
    >
      <div className="desktop-icon-sculpture" aria-hidden>
        <div className="desktop-icon-top">
          <div className="desktop-icon-face">
            <span>{icon}</span>
          </div>
        </div>
        <div className="desktop-icon-base" />
      </div>
      <span className="desktop-icon-label two-line-clamp">
        {title}
      </span>
    </div>
  );
};

export default DesktopIcon;
