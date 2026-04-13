import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FloatingHearts } from '@/components/FloatingHearts';
import { ParticleBackground } from '@/components/ParticleBackground';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-primary/5 overflow-hidden flex items-center justify-center">
      {/* Background Elements */}
      <ParticleBackground />
      <FloatingHearts />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="text-9xl mb-4 animate-bounce">💜</div>

        <div className="space-y-4">
          <h1 className="text-7xl md:text-8xl font-bold gradient-text">404</h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">
            Oops! This page got lost
          </p>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            Like a moment I can't find, but that's okay...
            <br />
            Let me bring you back to where you belong 💗
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full text-lg
              hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md glow"
          >
            Return to Our World
          </button>
          <a
            href="/"
            className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full text-lg
              hover:bg-primary/10 transition-all duration-300"
          >
            Go Home
          </a>
        </div>

        <p className="text-sm text-foreground/50 pt-8">
          Path: <code className="bg-primary/10 px-2 py-1 rounded text-xs">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
