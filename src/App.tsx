import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import Services from './sections/Services';
import FeatureWorkflow from './sections/FeatureWorkflow';
import FeatureVoice from './sections/FeatureVoice';
import FeatureLeads from './sections/FeatureLeads';
import FeatureCustom from './sections/FeatureCustom';
import Process from './sections/Process';
import CaseStudies from './sections/CaseStudies';
import Pricing from './sections/Pricing';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

// Components
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';

// Scroll animations
import { useScrollReveal } from './lib/scrollAnimations';

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll with premium settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Section-level scroll reveal
  useScrollReveal();

  return (
    <div className="relative min-h-screen bg-nexora-black">
      <ScrollProgress />
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Services />
        <FeatureWorkflow />
        <FeatureVoice />
        <FeatureLeads />
        <FeatureCustom />
        <Process />
        <CaseStudies />
        <Pricing />
        <CTA />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
