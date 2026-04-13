import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export function TypewriterText({ text, speed = 50, onComplete }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length === text.length) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, displayedText.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, text, speed, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="inline-block ml-1 h-6 w-1 bg-primary animate-pulse" />}
    </span>
  );
}
