"use client";
import { useState } from "react";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { NAV_LINKS, LINKS } from "@/constants";

/** Sections that live in the horizontal scroll zone */
const HORIZONTAL_IDS = new Set(["about-me", "skills", "projects", "training"]);

const scrollTo = (id: string) => {
  if (typeof window === "undefined") return;
  if (HORIZONTAL_IDS.has(id)) {
    // Horizontal scroll — defer to the hs controller
    if (window.hsScrollTo) window.hsScrollTo(id);
  } else {
    // Vertical scroll — smooth native anchor
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001427] backdrop-blur-md z-50 px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo + Name */}
        <button
          onClick={() => scrollTo("about-me")}
          className="flex items-center bg-transparent border-none p-0"
          style={{ cursor: "none" }}
        >
          <div className="font-bold text-gray-300 text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Shahid Afrid Khan
          </div>
        </button>

        {/* Web Navbar Links */}
        <div className="hidden lg:flex h-full flex-row items-center justify-between">
          <div className="flex items-center justify-between gap-1 h-auto border border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-[16px] py-[8px] rounded-full text-gray-200 text-sm">
            {NAV_LINKS.map((link) => (
              <button
                key={link.title}
                onClick={() => scrollTo(link.link.replace("#", ""))}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition px-2 bg-transparent border-none text-gray-200 text-sm"
                style={{ cursor: "none" }}
              >
                {link.title}
              </button>
            ))}
          </div>
        </div>

        {/* Social Icons (Web) */}
        <div className="hidden md:flex flex-row gap-5 items-center">
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer noopener"
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-cyan-400 transition">
            <RxLinkedinLogo className="h-5 w-5" />
            <span className="hidden lg:block">LinkedIn</span>
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer noopener"
            className="flex items-center gap-1 text-sm text-gray-300 hover:text-purple-400 transition">
            <RxGithubLogo className="h-5 w-5" />
            <span className="hidden lg:block">GitHub</span>
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-white focus:outline-none text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ cursor: "pointer" }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[65px] left-0 w-full bg-[#030014] p-5 flex flex-col items-center text-gray-300 lg:hidden border-t border-purple-900/30">
          <div className="flex flex-col items-center gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link.title}
                onClick={() => { scrollTo(link.link.replace("#", "")); setIsMobileMenuOpen(false); }}
                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center bg-transparent border-none text-gray-300"
              >
                {link.title}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-6">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer noopener"
              className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition">
              <RxLinkedinLogo className="h-6 w-6" /><span>LinkedIn</span>
            </a>
            <a href={LINKS.github} target="_blank" rel="noreferrer noopener"
              className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition">
              <RxGithubLogo className="h-6 w-6" /><span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};