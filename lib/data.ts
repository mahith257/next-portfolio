export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const personalInfo = {
  name: "Sai Mahith Reddy Bekkem",
  shortName: "Mahith",
  title: "Senior Frontend Engineer",
  bio: "Senior Frontend Engineer with 5 years of experience architecting and scaling React and Next.js applications. Expertise in performance optimization, component architecture, data visualization, cross-functional collaboration, and mentoring peers through code reviews.",
  email: "mahith.reddy.sai@gmail.com",
  phone: "+91 7989910999",
  github: "https://github.com/mahith257",
  linkedin: "https://www.linkedin.com/in/sai-mahith-reddy-bekkem-46b7a61b1/",
  resumeUrl:
    "https://drive.google.com/file/d/1-KnU5y9hk2YiJ46Bps39NcGmRqG-w2UW/view?usp=sharing",
  education: {
    school: "BITS Pilani Hyderabad Campus",
    degree: "Bachelor of Engineering in Computer Science",
    period: "July 2017 – Jun 2021",
    location: "Hyderabad, Telangana",
  },
} as const;

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML", "CSS", "Java", "Python", "SQL"],
  },
  {
    category: "Technologies",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "GraphQL",
      "REST API",
      "React Query",
      "Apollo Client",
      "Webpack",
      "Microfrontend",
      "Node.js",
      "Spring Boot",
    ],
  },
  {
    category: "UI Libraries & Styling",
    skills: ["Material UI", "Ant Design", "Shadcn UI", "Tailwind CSS"],
  },
  {
    category: "Testing",
    skills: ["Jest", "React Testing Library"],
  },
  {
    category: "Tools",
    skills: ["Firebase", "Sentry", "Git", "AWS"],
  },
];

export const experiences: Experience[] = [
  {
    company: "AiDASH",
    role: "SDE 2",
    period: "Apr 2025 – Present",
    location: "Bangalore, Karnataka",
    bullets: [
      "Spearheaded UI development for 5+ customer-facing and internal admin tools, architecting a web application from scratch with secure authentication, Role-Based Access Control, and CMS features, resulting in enhanced operational efficiency and SEO performance.",
      "Built high-performance Infinite List component using react-window with virtualization, reducing initial load time by 40% and improving user engagement through optimized rendering.",
      "Deployed micro frontend for user management, decoupling it from the legacy monolithic architecture, enabling independent deployments, cutting regression bugs by 30% and reducing release cycles from 2 weeks to 3 days.",
    ],
  },
  {
    company: "AiDASH",
    role: "Software Engineer",
    period: "Oct 2022 – Mar 2025",
    location: "Bangalore, Karnataka",
    bullets: [
      "Engineered efficient API data management using GraphQL + Apollo Client and REST + React Query, implementing intelligent caching mechanisms to increase average user session duration by 60%.",
      "Integrated 5+ data visualization libraries, building reusable components for charts, maps, and data tables, improving user data comprehension by 50% and enhancing product interactivity.",
      "Collaborated cross-functionally with design and backend teams, translating UX wireframes into pixel-perfect UI and defining API contracts, reducing integration issues by 40%.",
    ],
  },
  {
    company: "NatWest Group",
    role: "Software Engineer",
    period: "Jul 2021 – Sep 2022",
    location: "",
    bullets: [
      "Developed high-performance React applications optimizing rendering and responsiveness, resulting in a 20% increase in user engagement across core products.",
      "Created 10+ reusable custom React hooks and implemented scalable state management using Context API, reducing state-related bugs by 30% and improving code maintainability.",
    ],
  },
  {
    company: "MapmyIndia",
    role: "Software Engineer Intern",
    period: "Jul 2020 – Dec 2020",
    location: "",
    bullets: [
      "Processed 1000+ road images for lane detection datasets using Python, OpenCV, and NumPy, directly supporting model training pipelines.",
    ],
  },
  {
    company: "RSP",
    role: "Intern",
    period: "Jun 2019 – Aug 2019",
    location: "",
    bullets: [
      "Developed an online portal for Srujani, an internal suggestion system for the employees of RSP.",
      "Tech Stack: ASP.NET, C#, JavaScript, CSS, and Oracle DB.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Binge Watch",
    description:
      "Movie discovery platform with advanced search, genre filtering, and responsive UI. Implements debounced search to reduce API calls by 60%. Built with Material UI components including Modal, Carousel, Pagination, and Tabs.",
    techStack: ["React", "Material UI", "REST APIs", "Axios"],
    image: "/projects/bingewatch.png",
    liveUrl: "https://effortless-sundae-039cea.netlify.app/",
    githubUrl: "https://github.com/mahith257/binge-watch",
  },
  {
    title: "Project Buzz",
    description:
      "Project management tool with task creation, user assignment, and collaborative workflows. Features real-time updates, comment system, and project filtering by category.",
    techStack: ["React", "Firebase", "Firestore", "Context API"],
    image: "/projects/projectbuzz.png",
    liveUrl: "https://projectbuzz-9eb40.web.app/",
    githubUrl: "https://github.com/mahith257/project-buzz",
  },
  {
    title: "Wordle Clone",
    description:
      "Recreation of the popular word-guessing game. Guess the correct five-letter word within six attempts with color-coded feedback for each guess.",
    techStack: ["React", "CSS", "Game Logic"],
    image: "/projects/wordleclone.png",
    liveUrl: "https://amazing-klepon-d2d3d6.netlify.app/",
    githubUrl: "https://github.com/mahith257/wordle-clone",
  },
  {
    title: "Gmail Clone",
    description:
      "A clone resembling Gmail built with React and Redux for state management. Uses Firebase for backend services and authentication.",
    techStack: ["React", "Redux", "Firebase"],
    image: "/projects/gmailclone.png",
    liveUrl: "https://clone-14161.web.app/",
    githubUrl: "https://github.com/mahith257/gmail-clone",
  },
  {
    title: "Flipping Cards",
    description:
      "A card-matching memory game. Match pairs of cards while the game records the number of turns taken for completion.",
    techStack: ["React", "CSS Animations"],
    image: "/projects/flippingcards.png",
    liveUrl: "https://tranquil-cupcake-674834.netlify.app/",
    githubUrl: "https://github.com/mahith257/flipping-cards",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
