
import React from 'react';
import { RESUME_DATA } from '../constants';

interface StartMenuProps {
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose }) => {
  return (
    <div
      className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 glass-panel rounded-3xl overflow-hidden flex flex-col z-[10000] border border-white/45 shadow-[0_32px_72px_rgba(8,26,58,0.45)]"
      style={{ width: 'min(92vw, 380px)' }}
    >
      {/* Header */}
      <div className="window-chrome relative px-6 py-7 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-3xl bg-white/15 border border-white/35 flex items-center justify-center text-3xl">
            <span aria-hidden>👤</span>
          </div>
          <div>
            <p className="text-[13px] uppercase tracking-[0.32em] text-white/70">Portfolio Access</p>
            <h2 className="text-2xl font-semibold leading-tight">{RESUME_DATA.name}</h2>
            <p className="text-[13px] text-white/75 mt-1 two-line-clamp">{RESUME_DATA.title}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="window-control window-control--close absolute top-3 right-3"
          aria-label="Close start menu"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div className="bg-white/78 backdrop-blur-md text-[15px] text-slate-700 px-6 py-7 flex flex-col gap-6">
        <section className="section-pane">
          <span className="text-[11px] tracking-[0.4em] uppercase text-blue-800/60">Highlights</span>
          <ul className="mt-3 space-y-3">
            <li className="list-marker">Backend-focused engineer exploring AI agents and productivity tooling.</li>
            <li className="list-marker">Comfortable across Python, Java, C++, SQL, and modern cloud stacks.</li>
            <li className="list-marker">Active participant in national hackathons and leadership initiatives.</li>
          </ul>
        </section>

        <section className="grid grid-cols-1 gap-3">
          <a
            className="command-button justify-between"
            href={`mailto:${RESUME_DATA.email}`}
          >
            <span className="flex items-center gap-2"><span aria-hidden>✉</span>Email</span>
            <span className="text-[12px] uppercase tracking-[0.35em] text-blue-500/70">Contact</span>
          </a>
          <div className="flex gap-3">
            <a
              className="command-button flex-1 justify-center"
              href={`https://www.linkedin.com/in/${RESUME_DATA.links.linkedIn.toLowerCase().replace('linkedin/', '')}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-xl" aria-hidden>in</span>
              <span>LinkedIn</span>
            </a>
            <a
              className="command-button flex-1 justify-center"
              href={`https://github.com/${RESUME_DATA.links.github.split('/').pop()}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="text-xl" aria-hidden>🪟</span>
              <span>GitHub</span>
            </a>
          </div>
        </section>

        <section className="section-pane">
          <span className="text-[11px] tracking-[0.4em] uppercase text-blue-800/60">Quick Snapshot</span>
          <div className="mt-3 grid grid-cols-2 gap-4 text-[14px]">
            <div>
              <p className="text-blue-900/80 font-semibold">Languages</p>
              <p>{RESUME_DATA.languages.join(', ')}</p>
            </div>
            <div>
              <p className="text-blue-900/80 font-semibold">Latest Internship</p>
              <p>{RESUME_DATA.internships[0].company}</p>
            </div>
            <div>
              <p className="text-blue-900/80 font-semibold">Focus</p>
              <p>Backend, AI agents</p>
            </div>
            <div>
              <p className="text-blue-900/80 font-semibold">Availability</p>
              <p>Open to projects</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-slate-950/25 backdrop-blur-md px-5 py-4 flex items-center justify-between text-[12px] text-white/75">
        <div className="flex items-center gap-3">
          <span aria-hidden>🔒</span>
          <span>Lock</span>
        </div>
        <button onClick={onClose} className="uppercase tracking-[0.4em] font-semibold text-white/90">Close</button>
      </div>
    </div>
  );
};

export default StartMenu;
