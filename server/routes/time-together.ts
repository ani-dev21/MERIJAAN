import { RequestHandler } from 'express';

interface TimeDifference {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export const handleTimeTogetherEndpoint: RequestHandler = (_req, res) => {
  try {
    // Start date: 14-02-2026, 8:41 PM (20:41)
    const startDate = new Date(2026, 1, 14, 20, 41, 0); // February is 1
    const now = new Date();

    const diff = now.getTime() - startDate.getTime();

    let timeDifference: TimeDifference;

    if (diff > 0) {
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      timeDifference = {
        days,
        hours,
        minutes,
        seconds,
        totalSeconds,
      };
    } else {
      // Before start date
      timeDifference = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
      };
    }

    res.json({
      success: true,
      startDate: startDate.toISOString(),
      currentTime: now.toISOString(),
      timeTogether: timeDifference,
      message: "Two months of being each other's support, learning each other, and growing together without losing ourselves.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to calculate time together',
    });
  }
};
