"use client";

import { Header } from "@/components/header";
import { HeroContent } from "@/components/hero-content";
import { PulsingCircle } from "@/components/pulsing-circle";
import { ShaderBackground } from "@/components/shader-background";

export const SparkA1Page = () => {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
    </ShaderBackground>
  );
};
