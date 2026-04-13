import { useEffect, useRef, useState } from 'react';
import { Music, Music2 } from 'lucide-react';

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const savedPreference = localStorage.getItem('music-enabled');
    if (savedPreference === 'true' && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked by browser
      });
      setIsPlaying(true);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const initAnalyser = () => {
    if (!audioRef.current) return;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioCtx();
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
    }
  };

  const updateGlow = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const total = dataArrayRef.current.reduce((sum, value) => sum + value, 0);
    const avg = total / dataArrayRef.current.length;
    const level = Math.min(avg / 160, 1);
    document.documentElement.style.setProperty('--audio-glow', level.toFixed(3));
    rafRef.current = requestAnimationFrame(updateGlow);
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        localStorage.setItem('music-enabled', 'false');
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.documentElement.style.setProperty('--audio-glow', '0');
      } else {
        initAnalyser();
        await audioContextRef.current?.resume();
        await audioRef.current.play();
        setIsPlaying(true);
        localStorage.setItem('music-enabled', 'true');
        updateGlow();
      }
    } catch (error) {
      console.log('Could not play audio:', error);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="none"
      >
        <source src={`${import.meta.env.BASE_URL}static/audio/ambient-love.mp3`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3">
        <div
          className="px-4 py-2 rounded-full text-sm font-semibold text-white tracking-wide
            bg-gradient-to-r from-primary/90 to-secondary/90 shadow-md glow soft-shadow animate-pulse-glow"
        >
          Our song &gt;&gt;3
        </div>

        <button
          onClick={toggleMusic}
          className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white
            hover:shadow-lg hover:scale-110 transition-all duration-300 shadow-md glow group"
          title={isPlaying ? 'Turn off music' : 'Turn on music'}
        >
          {isPlaying ? (
            <Music className="w-6 h-6 group-hover:animate-bounce" />
          ) : (
            <Music2 className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}
