"use client";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { RxLinkedinLogo, RxGithubLogo } from "react-icons/rx";
import { LINKS } from "@/constants";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(0,245,255,0.2)",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    display: "block",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#00f5ff";
    e.target.style.boxShadow = "0 0 12px rgba(0,245,255,0.2)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(0,245,255,0.2)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{ background: "#000000" }}
    >
      {/* Floating particles background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,245,255,0.06) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Section header */}
      <div className="flex flex-col items-center gap-3 mb-12 text-center">
        <span className="text-sm text-cyan-400 font-semibold tracking-widest uppercase">
          Get In Touch
        </span>
        <h2 className="text-4xl lg:text-5xl font-bold text-white">
          Contact{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Me
          </span>
        </h2>
      </div>

      {/* Form card */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(0,245,255,0.15)",
          borderRadius: "16px",
          padding: "40px",
        }}
      >
        <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            rows={5}
            style={{ ...inputStyle, height: "140px", resize: "vertical" }}
            onFocus={handleFocus as any}
            onBlur={handleBlur as any}
          />

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%",
              height: "52px",
              background: status === "sending"
                ? "rgba(0,245,255,0.3)"
                : "linear-gradient(135deg, #00f5ff, #a855f7)",
              border: "none",
              borderRadius: "8px",
              color: "#000",
              fontWeight: 700,
              fontSize: "16px",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={e => {
              if (status !== "sending") {
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            {status === "sending" ? "Sending..." : "Send Message →"}
          </button>

          {status === "success" && (
            <p
              style={{
                color: "#4ade80",
                textAlign: "center",
                fontSize: "14px",
                animation: "fadeIn 0.4s ease",
              }}
            >
              ✅ Message sent! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p
              style={{
                color: "#f87171",
                textAlign: "center",
                fontSize: "14px",
                animation: "fadeIn 0.4s ease",
              }}
            >
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>

      {/* Direct contact info */}
      <div className="mt-10 flex flex-col items-center gap-4 text-gray-400 text-sm">
        <a
          href="mailto:shahidafridkhanphatan@gmail.com"
          className="flex items-center gap-2 hover:text-cyan-400 transition"
        >
          📧 shahidafridkhanphatan@gmail.com
        </a>
        <div className="flex gap-6">
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <RxLinkedinLogo className="h-5 w-5" /> LinkedIn
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-2 hover:text-purple-400 transition"
          >
            <RxGithubLogo className="h-5 w-5" /> GitHub
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </section>
  );
};
