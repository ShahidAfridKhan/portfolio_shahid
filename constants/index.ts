import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/shahid-afrid-khan/",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/ShahidAfridKhan",
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About Me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Training",
    link: "#training",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
  {
    title: "Achievements",
    link: "#achievements",
  },
  {
    title: "Education",
    link: "#education",
  },
  {
    title: "Contact",
    link: "#contact",
  },
] as const;

export const PROJECTS = [
  {
    tag: "AI / Web",
    title: "🍕 CraveAI — Food Ordering Platform",
    description:
      "An AI-powered food ordering platform where users can browse a menu, get smart food recommendations from an AI chatbot, and place orders digitally. The entire order and billing flow is automated using n8n workflows. Backend is managed through Google Sheets and Excel.",
    tech: ["HTML", "CSS", "JavaScript", "AI Agent", "n8n", "Google Sheets", "Excel"],
    link: "https://github.com/ShahidAfridKhan/AI-Integrated-Food-Ordering-Platform-.git",
  },
  {
    tag: "Data / Analytics",
    title: "🚗 TheRide — Uber Analytics Dashboard",
    description:
      "An interactive Power BI dashboard that analyzes Uber ride data across hourly, daily, and monthly timeframes. Visualizes trip volume, revenue trends, peak demand windows, and low-usage periods to help with driver allocation and planning decisions.",
    tech: ["Power BI", "DAX", "Power Query", "Excel", "Data Modeling"],
    link: "https://github.com/ShahidAfridKhan/PowerBI.git",
  },
  {
    tag: "Android / Security",
    title: "📔 WhisperDiary — Secure Personal Diary",
    description:
      "A secure Android personal diary app where users can write and store their private daily thoughts. Features a clean XML-based UI, smooth navigation, voice recognition-based unlock to protect entries, and strong data privacy built right into the core.",
    tech: ["Android Studio", "Kotlin", "XML", "Voice Recognition"],
    link: "https://github.com/ShahidAfridKhan/WhisperDiary-.git",
  },
] as const;

export const CERTIFICATIONS = [
  {
    icon: "☁️",
    title: "Oracle Cloud Infrastructure 2025 — AI Foundations Associate",
    issuer: "Oracle",
    date: "August 2025",
    description:
      "Certified in foundational AI and Machine Learning concepts on Oracle Cloud Infrastructure.",
    link: "https://www.linkedin.com/posts/shahid-afrid-khan_oraclecertified-ai-cloudcomputing-activity-7377651722111893504-7_tv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZZJQgB7rvJHyxoPkJsTZq44XmEwzQGIBU",
  },
  {
    icon: "📱",
    title: "Android App Development",
    issuer: "Internship Certification Body",
    date: "August 2025",
    description:
      "Certified in Android development covering Kotlin, XML UI design, and Play Store deployment workflow.",
    link: "https://www.linkedin.com/posts/shahid-afrid-khan_androiddevelopment-appdevelopment-playstore-activity-7364537125196754944-lfau?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZZJQgB7rvJHyxoPkJsTZq44XmEwzQGIBU",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    borderColor: "#f59e0b",
    emoji: "🏆",
    title: "University Hackathon — 1st Round Winner",
    description:
      "Won the first round of a university-level hackathon where teams were judged specifically on UI/UX design quality. Our team's design stood out from all competing teams for its clean layout, intuitive flow, and visual polish.",
    date: "",
  },
  {
    borderColor: "#10b981",
    emoji: "🤖",
    title: "5 n8n Automation Agents Built",
    description:
      "Built five real automation agents using n8n for mini projects. Each agent handled real-world event-driven workflows, streamlining repetitive tasks and strengthening my understanding of intelligent automation pipelines.",
    date: "June 2025",
  },
] as const;

export const EDUCATION = [
  {
    institution: "Lovely Professional University",
    location: "Punjab, India",
    degree: "Bachelor of Technology — Computer Science and Engineering (Data Science)",
    duration: "August 2023 — Present",
    grade: "CGPA: 6.86",
  },
  {
    institution: "NRI Junior College",
    location: "Tenali, Andhra Pradesh",
    degree: "Intermediate (Class 12)",
    duration: "April 2021 — March 2023",
    grade: "83.6%",
  },
  {
    institution: "Narayana E.M School",
    location: "Tenali, Andhra Pradesh",
    degree: "Matriculation (Class 10)",
    duration: "April 2020 — March 2021",
    grade: "100%",
  },
] as const;

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/shahid-afrid-khan/",
  github: "https://github.com/ShahidAfridKhan",
};
