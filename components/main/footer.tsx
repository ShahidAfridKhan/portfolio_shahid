import Link from "next/link";
import { RxGithubLogo, RxLinkedinLogo } from "react-icons/rx";
import { LINKS } from "@/constants";

export const Footer = () => {
  return (
    <div className="w-full bg-transparent text-gray-200">
      {/* Gradient divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-cyan-500 opacity-60" />

      <div className="w-full flex flex-col md:flex-row items-center justify-between px-10 py-6">
        <div className="text-sm text-gray-400">
          © 2026 Shahid Afrid Khan. All rights reserved.
        </div>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <Link
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan-400 transition group"
          >
            <RxLinkedinLogo className="h-5 w-5 group-hover:text-cyan-400" />
            <span>LinkedIn ↗</span>
          </Link>
          <Link
            href={LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-purple-400 transition group"
          >
            <RxGithubLogo className="h-5 w-5 group-hover:text-purple-400" />
            <span>GitHub ↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
