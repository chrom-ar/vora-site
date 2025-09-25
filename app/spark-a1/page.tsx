import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroContent } from "@/components/hero-content";
import { ShaderBackground } from "@/components/shader-background";

const SparkA1Page = () => {
  return (
    <ShaderBackground>
      <div className="min-h-screen flex flex-col">
        <Header />
        <HeroContent />
        <Footer />
      </div>
    </ShaderBackground>
  );
};

export default SparkA1Page;