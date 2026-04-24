import { Link } from "react-router-dom";
import { motion, useMotionValue } from "motion/react";
import Orb from "../components/Orb";
import React from "react";

const LandingPage = () => {
  // 3D Tilt effect logic for the hero content
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25; // Division controls tilt intensity
    const y = (clientY - top - height / 2) / 25;
    
    // Invert the axes so it tilts *towards* the mouse naturally
    mouseX.set(x);
    mouseY.set(-y);
  };

  const handleMouseLeave = () => {
    // Animate smoothly back to 0
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="relative w-full h-[calc(100vh-120px)] flex flex-col items-center justify-center overflow-hidden rounded-[2rem] mt-4 shadow-2xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
    >
      {/* Orb Background layer */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-auto">
        <Orb 
          hoverIntensity={1.2} 
          rotateOnHover={true} 
          hue={240} 
          forceHoverState={false} 
          backgroundColor="#000000" 
        />
      </div>
      
      {/* 3D Foreground Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto space-y-8 pointer-events-none"
        style={{
          rotateX: mouseY,
          rotateY: mouseX,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          style={{ translateZ: 40 }}
          className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase backdrop-blur-md shadow-[0_0_20px_rgba(var(--primary),0.3)]"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Next Generation AI
        </motion.div>
        
        <motion.h1 
          style={{ translateZ: 80 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Analyze Policies <br/> 
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-500 to-purple-600">Instantly</span>
        </motion.h1>
        
        <motion.p 
          style={{ translateZ: 60 }}
          className="text-lg md:text-xl text-muted-foreground max-w-150 leading-relaxed drop-shadow-md font-medium"
        >
          Upload complex documents, insurance policies, or legal contracts and let our AI-driven engine extract key insights, risks, and obligations in seconds.
        </motion.p>
        
        <motion.div 
          style={{ translateZ: 100 }}
          className="flex flex-col sm:flex-row gap-6 pt-6 pointer-events-auto"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/analyze" className="inline-flex h-14 items-center justify-center rounded-full bg-foreground text-background px-10 text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Start Analyzing
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/about" className="inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-xl text-white px-10 text-base font-semibold shadow-sm transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
