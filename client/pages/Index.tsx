import { useState, useEffect, useRef } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FloatingHearts } from '@/components/FloatingHearts';
import { RelationshipTimer } from '@/components/RelationshipTimer';
import { TypewriterText } from '@/components/TypewriterText';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const loveLetter = `The first time I saw you at CCD that day,
You were lost in your work… and I got lost in you anyway.

You almost looked up, I pretended to look away,
But truth is… I was watching you in every possible way.

That moment, quietly, my heart chose you,
And made a silent prayer "If it's her… let it be true."

And somehow, against everything I knew,
Life answered softly… and gave me you.

You fit right here   just below my shoulder line,
Like you were designed to fall perfectly into mine.

When you hug me and hear my heartbeat through,
It's not just a sound… it's calling out only you.

Your brown eyes aren't just something I see,
They're a whole ocean… pulling all of me.

And your smile… God, where do I even start?
It doesn't just pause time   it rewrites my heart.

Your laugh is so pure, like something divine,
Like the world took a breath… just to make you shine.

Those soft pink lips… they don't just tempt, it's true,
They feel like a promise I want to stay loyal to.

Your tiny nose   every emotion it shows,
Your anger, your joy… it somehow all glows.

Sometimes I wonder when we're close, just me and you,
If my big nose will awkwardly come between us too 😌

But then I realize something simple and true,
Nothing imperfect could ever matter… when it's you.

Your soul is soft… like untouched white,
And I swear I'll protect it with all of my light.

I know someone once hurt you, broke something deep,
Left behind wounds you still quietly keep.

But listen to me… and believe this part,
I will never be the one who breaks your heart.

When you're tired, I'll be your rest, your peace,
When the world gets loud, I'll be your release.

I don't just want your body, your touch, or your kiss,
I want to care for you in ways you didn't know exist.

I want to hold you on days you feel weak,
To be your silence when you can't even speak.

To hug you so close that one day it's true…
Our heartbeats forget what it means to be two.

I don't just want you   I need you, it's real,
Not out of lack… but because of what I feel.

You're not just love… not just a part,
You are my habit, my home, my heart.

I am yours… completely, quietly, endlessly true,
And if I have a forever… I want all of it with you. 💗`;
const memoryCaptions = [
  'Memory 1',
  'Memory 2',
  'Memory 3',
  'Memory 4',
  'Memory 5',
  'Memory 6',
];

export default function Index() {
  const [showIntro, setShowIntro] = useState(true);
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeCaption, setActiveCaption] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState('16 / 9');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const letterSection = document.getElementById('love-letter');
      if (letterSection) {
        const rect = letterSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setShowTypewriter(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

    const updateParallax = () => {
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / window.innerHeight;
        const translate = (progress - 0.5) * 18;
        node.style.transform = `translateY(${translate}px)`;
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    return () => {
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
    };
  }, []);

  useEffect(() => {
    if (!activeImage) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeImage]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoMuted;
      setVideoMuted(!videoMuted);
    }
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (value: number) => {
    if (!videoRef.current || !videoDuration) return;
    const nextTime = (value / 100) * videoDuration;
    videoRef.current.currentTime = nextTime;
    setVideoCurrentTime(nextTime);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-primary/5 overflow-hidden">
      {showIntro && (
        <div className="intro-overlay">
          <div className="intro-bloom" />
          <div className="intro-card">
            <span className="intro-eyebrow">A quiet entrance</span>
            <h1 className="intro-title">Our story</h1>
            <div className="intro-pulse" />
          </div>
        </div>
      )}
      {/* Background Elements */}
      <ParticleBackground />
      <FloatingHearts />

      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto animate-fade-in">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">For You, My Safe Place</span>
                <span className="text-4xl md:text-6xl ml-2">💜</span>
              </h1>

              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed">
                Every moment with you is where I belong.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center gap-3 text-3xl animate-pulse-glow">
              <span>❤️</span>
              <span>💗</span>
              <span>💜</span>
              <span>🫂</span>
              <span>✨</span>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button
                onClick={() => {
                  document.getElementById('love-letter')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full text-lg
                  hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md glow"
              >
                Enter Our World
              </button>
            </div>

            {/* Scroll indicator */}
            <div className="pt-12 animate-bounce">
              <svg className="w-6 h-6 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Relationship Timer Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div
              className="glassmorphism rounded-3xl p-8 md:p-12 backdrop-blur-md glow"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)',
              }}
            >
              <RelationshipTimer />
            </div>
          </div>
        </section>

        {/* Love Letter Section */}
        <section id="love-letter" className="py-20 px-4 relative">
          <div className="max-w-3xl mx-auto">
            <div className="glassmorphism rounded-3xl p-8 md:p-12 backdrop-blur-md space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text text-center animate-fade-in">
                A Love Letter 💌
              </h2>

              <div className="prose prose-invert max-w-none">
                <div className="space-y-6 text-foreground/85 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-light animate-fade-in">
                  {showTypewriter ? (
                    <TypewriterText text={loveLetter} speed={45} />
                  ) : (
                    <p className="text-center text-foreground/60 italic">
                      Scroll to reveal the love letter...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8 text-center">
              Our Memory 🎥
            </h2>

            <div className="relative group">
              {/* Video Container */}
              <div
                className="relative rounded-3xl overflow-hidden glow max-w-4xl mx-auto"
                style={{ aspectRatio: videoAspectRatio, maxHeight: '70vh' }}
              >
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain bg-transparent"
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  onTimeUpdate={() => {
                    if (!isSeeking && videoRef.current) {
                      setVideoCurrentTime(videoRef.current.currentTime);
                    }
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setVideoDuration(videoRef.current.duration || 0);
                      const { videoWidth, videoHeight } = videoRef.current;
                      if (videoWidth && videoHeight) {
                        setVideoAspectRatio(`${videoWidth} / ${videoHeight}`);
                      }
                    }
                  }}
                  muted={videoMuted}
                >
                  <source src="/static/video/love.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Overlay with controls */}
                {!videoPlaying && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <button
                      onClick={toggleVideo}
                      className="w-20 h-20 bg-white/80 hover:bg-white rounded-full flex items-center justify-center
                        transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Play className="w-8 h-8 text-primary fill-current ml-1" />
                    </button>
                  </div>
                )}

                {/* Custom Controls */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transition-opacity duration-300 ${
                    videoPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md rounded-full px-4 py-2">
                    <button
                      onClick={toggleVideo}
                      className="text-white hover:text-secondary transition-colors p-2"
                    >
                      {videoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>

                    <div className="flex-1">
  <input
    type="range"
    min={0}
    max={100}
    step={0.1}
    value={videoDuration ? (videoCurrentTime / videoDuration) * 100 : 0}
    onMouseDown={() => setIsSeeking(true)}
    onMouseUp={(event) => {
      setIsSeeking(false);
      handleSeek(Number((event.target as HTMLInputElement).value));
    }}
    onChange={(event) => handleSeek(Number(event.target.value))}
    className="w-full h-1 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 accent-white"
  />
</div>

<span className="text-xs text-white/70 min-w-[5rem] text-right">
  {formatTime(videoCurrentTime)} / {formatTime(videoDuration)}
</span>

                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-secondary transition-colors p-2"
                    >
                      {videoMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-center text-foreground/70 mt-4 text-sm md:text-base">
                A piece of my heart, made just for you 💜
              </p>

              {/* Fallback message */}
              <div className="text-center text-foreground/60 text-sm mt-2">
                Our memory is still loading... but my love for you never waits
              </div>
            </div>
          </div>
        </section>

        {/* Memories Gallery Section */}
        <section id="our-story" className="py-20 px-4 relative">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
              Memories Gallery 📸
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => {
  const imageSrc = `/static/images/memory-${i}.jpeg`;
  const caption = memoryCaptions[i - 1] ?? `Memory ${i}`;
  return (
    <div
      key={i}
      className="group relative rounded-2xl overflow-hidden aspect-square glassmorphism
        hover:scale-105 transition-all duration-300 cursor-pointer glow-pink"
      onClick={() => {
        setActiveImage(imageSrc);
        setActiveCaption(caption);
      }}
    >
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={`Memory ${i}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <p className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {caption}
      </p>
    </div>
  );
})}
            </div>

            <p className="text-center text-foreground/60 mt-8 text-sm">
              Placeholder memories - add your beautiful moments here 📷
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-12 text-center">
              Our Journey 🌹
            </h2>

            <div className="space-y-8">
              {[
                { date: '14 Feb 2026', title: 'The Beginning', description: 'Our love story started' },
                { date: '14 March 2026', title: 'One Month Milestone', description: 'Celebrating our first month together' },
                {
                  date: 'Forever',
                  title: 'The Future',
                  description: 'Our endless adventure awaits us',
                },
              ].map((milestone, idx) => (
                <div key={idx} className="timeline-card flex gap-6 md:gap-8 animate-slide-up" data-parallax style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    {idx < 2 && <div className="w-1 h-20 bg-gradient-to-b from-primary to-transparent" />}
                  </div>

                  <div className="pb-8">
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest">{milestone.date}</p>
                    <h3 className="text-2xl font-bold text-foreground mt-2">{milestone.title}</h3>
                    <p className="text-foreground/70 mt-1">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="py-20 px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                You Are My Everything 💗
              </h2>
              <p className="text-xl text-foreground/80 font-light leading-relaxed">
                This space is dedicated to you, to us, and to the beautiful journey we're creating together.
              </p>
            </div>

            <div className="text-5xl animate-pulse-glow">💜</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-primary/10 py-8 px-4 text-center text-foreground/60 text-sm">
          <p>Made with love for the most special person 💜</p>
        </footer>
      </div>

      {activeImage && (
  <div
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    onClick={() => setActiveImage(null)}
  >
    <div className="flex flex-col items-center gap-4">
      <img
        src={activeImage}
        alt={activeCaption || 'Full memory'}
        className="max-w-[92vw] max-h-[82vh] rounded-2xl shadow-2xl"
      />
      {activeCaption && (
        <p className="text-white/80 text-sm tracking-wide">{activeCaption}</p>
      )}
      <p className="text-white/60 text-xs">Click anywhere to close</p>
    </div>
  </div>
)}
    </div>
  );
}
