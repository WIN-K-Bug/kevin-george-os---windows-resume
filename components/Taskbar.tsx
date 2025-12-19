
import React, { useState, useEffect } from 'react';
import { WindowState, WindowId } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  onToggleWindow: (id: WindowId) => void;
  onStartClick: () => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onToggleWindow, onStartClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-12 w-full taskbar-glass flex items-center fixed bottom-0 left-0 z-[9999] px-3">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className="start-button h-9 px-4 flex items-center gap-3 italic font-black text-white rounded-2xl hover:brightness-110 active:brightness-95 transition-transform"
        aria-label="Open start menu"
      >
        <span className="text-2xl leading-none">❖</span>
        <span className="tracking-[0.25em] text-sm uppercase">Start</span>
      </button>

      {/* Active Windows */}
      <div className="flex-grow flex items-center px-4 gap-2 overflow-x-auto no-scrollbar">
        {windows.filter(w => w.isOpen).map(w => (
          <button
            key={w.id}
            onClick={() => onToggleWindow(w.id)}
            className={`glass-panel gleam-highlight flex items-center gap-3 px-4 h-9 min-w-[130px] max-w-[180px] text-xs text-blue-900/90 rounded-xl border border-white/40 shadow-sm truncate transition ${
              w.isMinimized ? 'opacity-70' : 'opacity-100'
            }`}
            aria-pressed={!w.isMinimized}
          >
            <span className="text-base" aria-hidden>{w.icon}</span>
            <span className="truncate font-semibold tracking-wide">{w.title}</span>
          </button>
        ))}
      </div>

      {/* Notification Area */}
      <div className="h-9 px-4 rounded-xl glass-panel flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-blue-50/80 border border-white/25">
        <div className="flex items-center gap-3 text-base">
          <span aria-hidden>🔊</span>
          <span aria-hidden>🛡️</span>
        </div>
        <div className="flex flex-col items-end font-semibold text-white/90">
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-[9px] tracking-[0.3em]">{time.toLocaleDateString([], { month: 'short', day: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
