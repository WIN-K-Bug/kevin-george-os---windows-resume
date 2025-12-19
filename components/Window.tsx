
import React, { useState, useEffect } from 'react';
import { WindowId, Position } from '../types';

interface WindowProps {
  id: WindowId;
  title: string;
  icon: string;
  zIndex: number;
  isMinimized: boolean;
  children: React.ReactNode;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
}

type WindowDimensions = { width: number; height: number };
type WindowLayout = { position: Position; dimensions: WindowDimensions };

const TABLET_BREAKPOINT = 1024;
const PHONE_BREAKPOINT = 640;

const calculateLayout = (viewportWidth?: number, viewportHeight?: number): WindowLayout => {
  const width = viewportWidth ?? (typeof window !== 'undefined' ? window.innerWidth : 1280);
  const height = viewportHeight ?? (typeof window !== 'undefined' ? window.innerHeight : 720);
  const isCompact = width <= TABLET_BREAKPOINT;
  const isPhone = width <= PHONE_BREAKPOINT;

  if (isCompact) {
    const horizontalPadding = isPhone ? 12 : 24;
    const topOffset = isPhone ? 72 : 88;
    const bottomReserve = isPhone ? 88 : 110;
    const minHeight = isPhone ? 260 : 320;
    const maxAvailable = height - topOffset - (isPhone ? 12 : 20);
    const desiredHeight = Math.max(height - (topOffset + bottomReserve), minHeight);
    const comfort = isPhone ? 220 : 300;

    const computedWidth = Math.max(width - horizontalPadding * 2, 320);
    let computedHeight: number;

    if (maxAvailable <= 0) {
      computedHeight = minHeight;
    } else {
      computedHeight = Math.min(desiredHeight, maxAvailable);
      if (maxAvailable >= comfort) {
        computedHeight = Math.max(computedHeight, comfort);
      }
      computedHeight = Math.min(computedHeight, maxAvailable);
      computedHeight = Math.max(computedHeight, Math.min(maxAvailable, comfort));
    }

    return {
      position: { x: horizontalPadding, y: topOffset },
      dimensions: { width: computedWidth, height: computedHeight },
    };
  }

  const padding = 16;
  const targetWidth = width * 0.9;
  const targetHeight = height * 0.88;

  const computedWidth = Math.min(Math.max(targetWidth, 360), width - padding * 2);
  const computedHeight = Math.min(Math.max(targetHeight, 420), height - padding * 2);

  return {
    position: {
      x: Math.max((width - computedWidth) / 2, padding),
      y: Math.max((height - computedHeight) / 2, padding),
    },
    dimensions: { width: computedWidth, height: computedHeight },
  };
};

const Window: React.FC<WindowProps> = ({ id, title, icon, zIndex, isMinimized, children, onClose, onMinimize, onFocus }) => {
  const [layout, setLayout] = useState<WindowLayout>(() => calculateLayout());
  const [isCompact, setIsCompact] = useState<boolean>(() => (typeof window !== 'undefined' ? window.innerWidth <= TABLET_BREAKPOINT : false));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  const { position, dimensions } = layout;

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(id);
    if (isCompact) {
      return;
    }
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    if (isCompact) {
      setIsDragging(false);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setLayout(prev => ({
          ...prev,
          position: {
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
          },
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isCompact]);

  useEffect(() => {
    const handleResize = () => {
      const next = calculateLayout(window.innerWidth, window.innerHeight);
      setLayout(next);
      setIsCompact(window.innerWidth <= TABLET_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMinimized) return null;

  const bodyMaxHeight = Math.max(dimensions.height - (isCompact ? 120 : 170), 220);

  return (
    <div
      className="absolute window-frame"
      style={{
        zIndex,
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
      }}
      onClick={() => onFocus(id)}
    >
      <div className="glass-panel flex h-full flex-col rounded-2xl overflow-hidden">
        {/* Title Bar */}
        <div
          className={`window-chrome flex items-center justify-between px-4 h-11 ${isCompact ? 'cursor-default' : 'cursor-move'} text-white select-none`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="text-lg shrink-0" aria-hidden>{icon}</span>
            <span className="text-sm font-semibold tracking-wide truncate">{title}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(event) => {
                event.stopPropagation();
                onMinimize(id);
              }}
              className="window-control window-control--min"
              aria-label="Minimize window"
            >
              _
            </button>
            <button
              className="window-control window-control--max"
              aria-label="Maximize window"
              disabled
            >
              □
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                onClose(id);
              }}
              className="window-control window-control--close"
              aria-label="Close window"
            >
              ×
            </button>
          </div>
        </div>

        {/* Menu Bar Simulation */}
        <div className="menu-strip flex items-center gap-4 px-4 py-2 bg-white/70 text-[11px] uppercase tracking-[0.18em] text-blue-900/70 border-b border-blue-200/40">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Navigate</span>
          <span>Help</span>
        </div>

        {/* Window Content */}
        <div
          className="window-body flex-grow p-5 mx-3 my-4 overflow-auto rounded-xl"
          style={{ maxHeight: bodyMaxHeight }}
        >
          {children}
        </div>

        {/* Status Bar */}
        <div className="status-bar flex justify-between items-center px-4 h-8 text-[11px] uppercase tracking-[0.12em] shimmer-bar">
          <span>Ready</span>
          <span>{title} OS</span>
        </div>
      </div>
    </div>
  );
};

export default Window;
