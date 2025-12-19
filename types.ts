
export type WindowId = 'about' | 'education' | 'skills' | 'projects' | 'experience' | 'certifications' | 'contact';

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: string;
}

export interface Position {
  x: number;
  y: number;
}
