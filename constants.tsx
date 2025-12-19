
import React from 'react';
import { WindowId } from './types';

export interface Project {
  title: string;
  duration: string;
  role: string;
  environment: string;
  language: string;
  stack: string;
  badge: string;
  highlights: string[];
}

export const RESUME_DATA = {
  name: "Kevin George",
  title: "MBA.Tech Computer Engineering",
  email: "kev.in990x@gmail.com",
  dob: "10/02/2005",
  languages: ["English", "Hindi"],
  links: {
    linkedIn: "kevin-george-990x",
    github: "WIN-K-Bug"
  },
  academics: [
    { qualification: "MBA.Tech CE", institute: "NMIMS, Navi Mumbai", board: "NMIMS University", year: "2025-28", score: "2.75/4 (Sem 4)" },
    { qualification: "XII", institute: "Radcliffe School Kharghar", board: "CBSE", year: "2023", score: "71%" },
    { qualification: "X", institute: "Bal Bharati Public School", board: "CBSE", year: "2021", score: "87.2%" }
  ],
  internships: [
    {
      company: "SRRS Software Solutions Pvt. Ltd",
      duration: "May’ 25 – Jun’ 25",
      role: "Backend Development Intern",
      stack: "SQL Server (SSMS), SQL, C++",
      highlights: [
        "Developed and optimized SQL stored procedures to handle data queries and enforce business rules.",
        "Assisted in backend development tasks, including database design and website maintenance."
      ]
    }
  ],
  projects: [
    {
      title: "SmartTrip",
      duration: "Sep’ 25 – Nov’ 25",
      role: "Design and Development",
      environment: "Android Studio",
      language: "XML, Dart (Flutter)",
      stack: "XML, Dart (Flutter), Android Studio",
      badge: "XML",
      highlights: [
        "Developed an AI-powered mobile app that creates budget-friendly trip plans based on user preferences.",
        "Integrated the app with Firebase for backend services like authentication, data storage, and real-time updates."
      ]
    },
    {
      title: "Campus buddy-solutions",
      duration: "Sep’ 25 – Oct’ 25",
      role: "Design and Development",
      environment: "VS Code",
      language: "JavaScript, CSS, Python",
      stack: "JavaScript, CSS, Python, VS Code",
      badge: "JavaScript",
      highlights: [
        "Built a campus platform connecting students, teachers, and clubs—helping students find clubs, events, and directions easily.",
        "Added real-time alerts for lecture cancellations or rescheduling, enabling instant teacher-to-student updates."
      ]
    },
    {
      title: "FareSy",
      duration: "Jan’ 25 – Feb’ 25",
      role: "Design and Development",
      environment: "VS Code, Vercel",
      language: "Java, HTML, CSS",
      stack: "Java, HTML, CSS, VS Code, Vercel",
      badge: "Java",
      highlights: [
        "Built a web platform that integrates multiple cab-service APIs to fetch real-time ride prices.",
        "Implemented an intelligent comparison system that analyses fares across apps and displays the cheapest, fastest option to users."
      ]
    }
  ],
  skills: {
    core: ["Python", "Java", "C++"],
    others: ["SQL", "Kotlin", "R", "HTML"],
    software: ["VS Code", "Cursor", "Figma"],
    os: ["Windows", "MAC"],
    databases: ["Firebase", "Supabase", "MySQL"],
    frameworks: ["Next.js", "Flutter", "Angular"]
  },
  professionalCertifications: [
    "Introduction to Cloud Infrastructure (Microsoft Azure) - Pursuing",
    "Oracle Fusion AI Agent Studio Certified Foundations Associate – Rel 1 (Sep' 25)"
  ],
  hackathons: [
    "Smart India Hackathon 2025",
    "ACE 2.0 MPSTME Hackathon"
  ],
  otherActivities: [
    "Skyscanner - Software Engineering Job Simulation (Forage) - Jun' 25",
    "AWS APAC - Solutions Architecture Job Simulation (Forage) - Jun' 25",
    "Complete Web Design: from Figma to WebFlow to Freelancing (Udemy) - May' 25",
    "High-Performance Leadership: Lessons from Formula 1 (Santander Open Academy) - Jul' 25",
    "Karate Black Belt Completion - Jun' 18"
  ],
  pos: [
    { 
      title: "Core Member | ROBOTICS Club", 
      duration: "Jan’ 25 – Apr’ 25", 
      highlights: [
        "Visited multiple college campuses to explore their robotics labs, technologies, and ongoing projects.",
        "Participated in club activities and accompanied the team to competitions, gaining exposure to robotics challenges and teamwork."
      ]
    },
    { 
      title: "Marketing Member | IGNITE 6.0", 
      duration: "Dec’ 23 – Dec’ 23", 
      highlights: [
        "Visited multiple colleges to promote our event and successfully convinced students to participate.",
        "Worked with the team to brainstorm and plan strategies for reaching a wider audience."
      ]
    }
  ]
};

export const WINDOW_CONFIGS: Record<WindowId, { title: string; icon: string }> = {
  about: { title: "About Kevin.exe", icon: "👤" },
  education: { title: "My_Academics.xls", icon: "🎓" },
  skills: { title: "My_Skills.dll", icon: "⚡" },
  projects: { title: "My_Projects.msi", icon: "📂" },
  experience: { title: "Work_History.doc", icon: "💼" },
  certifications: { title: "Certifications", icon: "📜" },
  contact: { title: "Contact_Me.lnk", icon: "📧" }
};
