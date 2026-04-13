import { useEffect, useState } from 'react';

interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function RelationshipTimer() {
  const [timeDiff, setTimeDiff] = useState<TimeDifference>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeDifference = () => {
      // Start date: 14-02-2026, 8:41 PM
      const startDate = new Date(2026, 1, 14, 20, 41, 0); // February is 1
      const now = new Date();

      const diff = now.getTime() - startDate.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeDiff({ days, hours, minutes, seconds });
      }
    };

    calculateTimeDifference();
    const interval = setInterval(calculateTimeDifference, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-xl blur-lg" />
        <div className="relative bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-md border border-white/40 rounded-xl px-6 py-4 min-w-24 shadow-lg">
          <span className="block text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-xs md:text-sm font-semibold text-foreground/70 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative z-10">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-foreground/80">
            Time We've Been Together
          </h3>
          <p className="text-sm text-foreground/60">Since 14th February 2026</p>
        </div>

        <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
          <TimeUnit value={timeDiff.days} label="Days" />
          <TimeUnit value={timeDiff.hours} label="Hours" />
          <TimeUnit value={timeDiff.minutes} label="Minutes" />
          <TimeUnit value={timeDiff.seconds} label="Seconds" />
        </div>

        <p className="text-center text-sm md:text-base text-foreground/70 italic max-w-2xl mx-auto">
          "Two months of being each other's support, learning each other, and growing together
          without losing ourselves."
        </p>
      </div>
    </div>
  );
}
