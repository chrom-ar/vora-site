"use client";

import { PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative z-10 px-8 py-6">
      <div className="w-full flex items-center justify-between">
        <div className="text-white/40 text-xs font-light">
          © 2025 Chroma Labs
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="https://x.com/chromar_spark"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Follow us on X (Twitter)"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Supercharged by spinner */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <PulsingBorder
              colors={["#fb730c", "#0483db", "#ff9a3d", "#1a9dff", "#d65a0b", "#0066bb", "#ffb366"]}
              colorBack="#00000000"
              speed={1.5}
              roundness={1}
              thickness={0.1}
              softness={0.2}
              intensity={5}
              spotSize={0.1}
              pulse={0.1}
              smoke={0.5}
              smokeSize={4}
              scale={0.65}
              rotation={0}
              frame={9161408.251009725}
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
              }}
            />

            <motion.svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ transform: "scale(1.3)" }}
            >
              <defs>
                <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
              </defs>
              <text className="text-xs fill-white/80 instrument">
                <textPath href="#circle" startOffset="0%">
                  Supercharged by Spark-A1
                </textPath>
              </text>
            </motion.svg>
          </div>
        </div>
      </div>
    </footer>
  );
};
