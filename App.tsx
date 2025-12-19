
import React, { useState, useCallback } from 'react';
import { WindowState, WindowId } from './types';
import { RESUME_DATA, WINDOW_CONFIGS, Project } from './constants';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';

const SkillSection: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
  <div className="section-pane space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase tracking-[0.18em]">
        &lt;/&gt;
      </div>
      <h3 className="text-[#123b91] font-semibold text-[15px] tracking-[0.28em] uppercase">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill) => (
        <span
          key={skill}
          className="skill-chip px-4 py-1.5 text-[15px] text-[#1b3f78] font-medium"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="section-pane space-y-4 relative">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h3 className="text-2xl font-semibold text-[#0b2f7c] leading-tight">{project.title}</h3>
        <p className="text-[14px] uppercase tracking-[0.35em] text-blue-900/40 mt-1">
          {project.role} • {project.duration}
        </p>
      </div>
      <span className="tag-badge px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9a6e1f]">
        {project.badge}
      </span>
    </div>
    <div className="glass-panel rounded-xl border border-white/60 px-4 py-3 text-[15px] text-[#17386c]">
      <span className="font-semibold text-[#0f2e74]">Stack</span>: {project.stack}
    </div>
    <ul className="space-y-2 text-[15px] text-[#1f3d6f]">
      {project.highlights.map((highlight, index) => (
        <li key={index} className="list-marker">
          {highlight}
        </li>
      ))}
    </ul>
  </article>
);

const App: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 'about', title: WINDOW_CONFIGS.about.title, icon: WINDOW_CONFIGS.about.icon, isOpen: true, isMinimized: false, zIndex: 10 },
    { id: 'education', title: WINDOW_CONFIGS.education.title, icon: WINDOW_CONFIGS.education.icon, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'skills', title: WINDOW_CONFIGS.skills.title, icon: WINDOW_CONFIGS.skills.icon, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'projects', title: WINDOW_CONFIGS.projects.title, icon: WINDOW_CONFIGS.projects.icon, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'experience', title: WINDOW_CONFIGS.experience.title, icon: WINDOW_CONFIGS.experience.icon, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'certifications', title: WINDOW_CONFIGS.certifications.title, icon: WINDOW_CONFIGS.certifications.icon, isOpen: false, isMinimized: false, zIndex: 1 },
    { id: 'contact', title: WINDOW_CONFIGS.contact.title, icon: WINDOW_CONFIGS.contact.icon, isOpen: false, isMinimized: false, zIndex: 1 },
  ]);

  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  const updateZIndex = useCallback((id: WindowId) => {
    setWindows(prev => {
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w);
    });
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w));
    updateZIndex(id);
    setIsStartMenuOpen(false);
  }, [updateZIndex]);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  }, []);

  const toggleMinimize = useCallback((id: WindowId) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized) {
      openWindow(id);
    } else {
      minimizeWindow(id);
    }
  }, [windows, openWindow, minimizeWindow]);

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case 'about':
        return (
          <div className="space-y-8 text-[#17386c]">
            <div className="flex flex-col md:flex-row gap-8 md:items-center">
              <div className="glass-panel w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shrink-0">
                <svg width="72" height="72" viewBox="0 0 24 24" fill="#123b91" role="img" aria-label="Kevin George avatar">
                  <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3 0-8 1.5-8 4.5V20h16v-1.5C20 15.5 15 14 12 14Z"/>
                </svg>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.55em] text-blue-900/45">Welcome to the portfolio OS</p>
                  <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[#0b2f7c]">{RESUME_DATA.name}</h1>
                  <h2 className="text-xl md:text-2xl text-[#2f6cdf] font-semibold mt-2">{RESUME_DATA.title}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
                  <div className="glass-panel rounded-xl px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-blue-900/40">Primary Contact</p>
                    <a href={`mailto:${RESUME_DATA.email}`} className="text-[#0b2f7c] font-semibold break-words">{RESUME_DATA.email}</a>
                  </div>
                  <div className="glass-panel rounded-xl px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-blue-900/40">Born</p>
                    <p className="text-[#0b2f7c] font-semibold">{RESUME_DATA.dob}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="command-button"
                    href={`https://www.linkedin.com/in/${RESUME_DATA.links.linkedIn.toLowerCase().replace('linkedin/', '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-lg" aria-hidden>in</span>
                    <span>Connect on LinkedIn</span>
                  </a>
                  <a
                    className="command-button"
                    href={`https://github.com/${RESUME_DATA.links.github.split('/').pop()}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="text-lg" aria-hidden>🪟</span>
                    <span>Browse GitHub</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="section-pane bg-gradient-to-r from-[#fff9d6] via-[#fffdf2] to-white text-[15px] text-[#3a3a3a] leading-relaxed border border-[#f6d776]/60">
              <p className="font-semibold text-[#b45309] uppercase tracking-[0.35em] text-[11px]">Mission</p>
              <p className="mt-2">
                Hi, I am Kevin — a computer engineering student obsessed with bringing practical intelligence into everyday tools. Dive into the desktop to explore AI-driven projects, polished backend experiments, and the wins that shaped my path.
              </p>
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-5">
            {RESUME_DATA.academics.map((education, index) => (
              <article key={index} className="section-pane relative overflow-hidden">
                <span className="absolute top-4 right-5 tag-badge text-[#0b2f7c] px-3 py-1 text-[12px] font-semibold tracking-[0.35em] uppercase">
                  {education.year}
                </span>
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl" aria-hidden>
                    🎓
                  </div>
                  <div className="flex-1 space-y-4">
                    <header>
                      <h3 className="text-xl font-semibold text-[#0b2f7c]">{education.qualification}</h3>
                      <p className="text-[13px] uppercase tracking-[0.4em] text-blue-900/45 mt-1">Academic Journey</p>
                    </header>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px] text-[#1f3d6f]">
                      <div>
                        <dt className="font-semibold text-[#123b91]">Institute</dt>
                        <dd>{education.institute}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#123b91]">Board</dt>
                        <dd>{education.board}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="font-semibold text-[#123b91]">Score</dt>
                        <dd className="text-[#0b7a3c] font-semibold">
                          {education.score.includes('Sem')
                            ? `${education.score.split(' ')[0]} (As per ${education.score.split(' ').slice(1).join(' ')})`
                            : education.score}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </article>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <SkillSection title="Core" skills={RESUME_DATA.skills.core} />
            <SkillSection title="Software" skills={RESUME_DATA.skills.software} />
            <SkillSection title="OS" skills={RESUME_DATA.skills.os} />
            <SkillSection title="Databases" skills={RESUME_DATA.skills.databases} />
            <SkillSection title="Languages" skills={RESUME_DATA.skills.others} />
            <SkillSection title="Frameworks" skills={RESUME_DATA.skills.frameworks} />
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-5">
            {RESUME_DATA.projects.map((p, idx) => (
              <ProjectCard key={idx} project={p as Project} />
            ))}
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            {RESUME_DATA.internships.map((job, index) => (
              <article key={index} className="section-pane space-y-4">
                <header className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl" aria-hidden>
                      💼
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#0b2f7c] leading-tight">{job.role}</h3>
                      <p className="text-[16px] text-[#2f6cdf] font-semibold">{job.company}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#123b91] text-[12px] font-semibold tracking-[0.3em] uppercase">
                    <span aria-hidden>🕒</span>
                    {job.duration}
                  </span>
                </header>
                <div className="glass-panel rounded-xl px-5 py-4 text-[15px] text-[#1f3d6f]">
                  <span className="font-semibold text-[#0f2e74]">Environment</span>: {job.stack.split('(')[0]}
                  <span className="mx-2 text-blue-200">•</span>
                  <span className="font-semibold text-[#0f2e74]">Languages</span>:{' '}
                  {job.stack.includes(',') ? job.stack.split(',').slice(1).join(',') : job.stack}
                </div>
                <ul className="space-y-3 text-[15px] text-[#1f3d6f]">
                  {job.highlights.map((highlight, idx) => (
                    <li key={idx} className="list-marker">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-6">
            <section className="section-pane space-y-4">
              <header className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>🏅</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#0b2f7c]">Professional Certifications</h3>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-blue-900/45">Credentials & Continuous Learning</p>
                </div>
              </header>
              <ul className="space-y-3 text-[15px] text-[#1f3d6f]">
                {RESUME_DATA.professionalCertifications.map((certificate, index) => (
                  <li key={index} className="list-marker">
                    {certificate}
                  </li>
                ))}
              </ul>
            </section>

            <section className="section-pane space-y-4">
              <header className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>🏆</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#0b2f7c]">Hackathons & Competitions</h3>
                  <p className="text-[12px] uppercase tracking-[0.35em] text-blue-900/45">Rapid Prototyping & Collaboration</p>
                </div>
              </header>
              <div className="flex flex-wrap gap-2">
                {RESUME_DATA.hackathons.map((hackathon, index) => (
                  <span key={index} className="tag-badge text-[#9a6e1f] text-[13px] font-semibold uppercase tracking-[0.25em]">
                    {hackathon}
                  </span>
                ))}
              </div>
            </section>

            <section className="section-pane space-y-5">
              <header>
                <h3 className="text-xl font-semibold text-[#0b2f7c]">Positions of Responsibility</h3>
                <p className="text-[12px] uppercase tracking-[0.35em] text-blue-900/45">Leadership & Community</p>
              </header>
              <div className="space-y-4">
                {RESUME_DATA.pos.map((position, index) => (
                  <article key={index} className="glass-panel rounded-2xl px-4 py-4 border border-white/50">
                    <div className="flex flex-wrap justify-between gap-3">
                      <h4 className="text-[15px] font-semibold text-[#0b2f7c]">{position.title}</h4>
                      <span className="text-[12px] uppercase tracking-[0.3em] text-blue-900/50">{position.duration}</span>
                    </div>
                    <ul className="mt-3 space-y-2 text-[14px] text-[#1f3d6f]">
                      {position.highlights.map((highlight, idx) => (
                        <li key={idx} className="list-marker">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-pane space-y-3">
              <header>
                <h3 className="text-xl font-semibold text-[#0b2f7c]">Other Activities</h3>
                <p className="text-[12px] uppercase tracking-[0.35em] text-blue-900/45">Beyond the Classroom</p>
              </header>
              <ul className="space-y-2 text-[15px] text-[#1f3d6f]">
                {RESUME_DATA.otherActivities.map((activity, index) => (
                  <li key={index} className="list-marker">
                    {activity}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        );
      case 'contact':
        return (
          <div className="flex flex-col items-center justify-center p-8 space-y-8 text-[#17386c]">
            <div className="glass-panel w-28 h-28 rounded-3xl flex items-center justify-center text-5xl text-[#0b2f7c]">
              ✉
            </div>
            <div className="section-pane w-full max-w-md text-center space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.45em] text-blue-900/50">Drop A Line</p>
                <a href={`mailto:${RESUME_DATA.email}`} className="text-[28px] font-semibold text-[#0b2f7c] break-words">
                  {RESUME_DATA.email}
                </a>
              </div>
              <p className="text-[15px] text-[#1f3d6f]">
                I enjoy conversations around backend architecture, intelligent agents, and high-impact student initiatives. Feel free to reach out — I reply fast.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
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
              <div className="glass-panel rounded-xl px-5 py-4 text-[15px] text-[#1f3d6f]">
                <p className="text-[11px] uppercase tracking-[0.35em] text-blue-900/45">Languages</p>
                <p className="font-semibold">{RESUME_DATA.languages.join(', ')}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen desktop-bg relative overflow-x-hidden md:overflow-hidden text-white/80 pb-16">
      <div className="absolute -top-24 -left-10 w-72 h-72 bg-blue-500/25 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-8 left-1/2 -translate-x-1/2 max-w-md w-[90%] text-center space-y-3 pointer-events-none md:left-auto md:right-10 md:translate-x-0 md:text-right">
        <p className="uppercase tracking-[0.55em] text-white/60 text-xs sm:text-[13px]">Kevin George OS</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white/90 leading-tight">Launch the windows to explore my journey.</h1>
        <p className="text-sm sm:text-base text-white/75">Double-tap or double-click an app icon to explore a window. Minimised windows stay in the taskbar ready to restore.</p>
      </div>

      {/* Desktop Icons */}
      <div className="min-h-[calc(100vh-72px)] px-4 pt-28 pb-24 sm:px-6 md:pt-6 lg:px-10 xl:px-16">
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 w-full max-w-6xl place-items-center md:place-items-start">
          {windows.map((windowConfig) => (
            <DesktopIcon
              key={windowConfig.id}
              id={windowConfig.id}
              title={windowConfig.title}
              icon={windowConfig.icon}
              onClick={openWindow}
            />
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.filter(w => w.isOpen).map(w => (
        <Window
          key={w.id}
          id={w.id}
          title={w.title}
          icon={w.icon}
          zIndex={w.zIndex}
          isMinimized={w.isMinimized}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={updateZIndex}
        >
          {renderWindowContent(w.id)}
        </Window>
      ))}

      {/* Start Menu Overlay */}
      {isStartMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsStartMenuOpen(false)} 
          />
          <StartMenu onClose={() => setIsStartMenuOpen(false)} />
        </>
      )}

      {/* Taskbar */}
      <Taskbar 
        windows={windows} 
        onToggleWindow={toggleMinimize} 
        onStartClick={() => setIsStartMenuOpen(!isStartMenuOpen)} 
      />
    </div>
  );
};

export default App;
