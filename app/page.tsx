
import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import { Projects } from "@/components/main/projects";
import { Training } from "@/components/main/training";
import { Certifications } from "@/components/main/certifications";
import { Achievements } from "@/components/main/achievements";
import { Extracurricular } from "@/components/main/extracurricular";
import { Education } from "@/components/main/education";
import { Contact } from "@/components/main/contact";
import AutoScroll from "@/components/main/auto-scroll";
import HorizontalScrollClient from "@/components/main/horizontal-scroll-client";

/** Only the first 4 sections scroll horizontally */
const H_SECTION_IDS = ["about-me", "skills", "projects", "training"];

export default function Home() {
  return (
    <main className="w-full">
      {/* ── Horizontal zone: Hero → Training ───────────────── */}
      <HorizontalScrollClient sectionIds={H_SECTION_IDS}>
        <div className="h-scroll-panel" data-section="about-me">
          <Hero />
        </div>
        <div className="h-scroll-panel" data-section="skills">
          <Skills />
        </div>
        <div className="h-scroll-panel" data-section="projects">
          <Projects />
        </div>

        {/* Training panel — includes the ↓ Scroll Down indicator */}
        <div className="h-scroll-panel" data-section="training" style={{ position: "relative" }}>
          <Training />
          {/* Bouncing "Scroll Down" indicator at bottom-center of last horizontal panel */}
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              zIndex: 10,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2px",
                color: "#00f5ff",
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Scroll Down
            </span>
            <span
              style={{
                fontSize: "22px",
                color: "#00f5ff",
                textShadow: "0 0 10px rgba(0,245,255,0.6)",
                animation: "scrollBounce 1.5s ease-in-out infinite",
              }}
            >
              ↓
            </span>
          </div>
        </div>
      </HorizontalScrollClient>

      {/* ── Vertical zone: Certifications → Contact ─────────── */}
      <div id="vertical-sections">
        <AutoScroll />
        <Certifications />
        <Achievements />
        <Extracurricular />
        <Education />
        <Contact />
      </div>
    </main>
  );
}
