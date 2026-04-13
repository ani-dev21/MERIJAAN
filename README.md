# 💜 For You, My Safe Place

A premium, emotionally immersive romantic website dedicated to a special person. Built with React, TypeScript, Vite, TailwindCSS, and Express.

## ✨ Features

- **Soft Aesthetic**: Lavender and blush pink color palette with glassmorphism design
- **Animated Elements**: Floating hearts, particle animations, and smooth transitions
- **Relationship Timer**: Live countdown showing time spent together
- **Love Letter Section**: Beautiful typography for emotional storytelling
- **Custom Video Player**: Styled media player with custom controls
- **Memories Gallery**: Grid layout for cherished moments
- **Timeline**: Journey markers showing important milestones
- **Music Toggle**: Ambient background music (optional)
- **Fully Responsive**: Beautiful on all screen sizes
- **Fast & Modern**: React 18, Vite, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- pnpm (recommended) or npm

### Installation

1. **Install Dependencies**
```bash
pnpm install
```

2. **Start Development Server**
```bash
pnpm dev
```

The app will be available at `http://localhost:8080`

### Building for Production

```bash
pnpm build
```

Start production server:
```bash
pnpm start
```

## 📁 Project Structure

```
client/
  ├── pages/
  │   ├── Index.tsx         # Main homepage
  │   └── NotFound.tsx      # 404 page
  ├── components/
  │   ├── FloatingHearts.tsx
  │   ├── ParticleBackground.tsx
  │   ├── RelationshipTimer.tsx
  │   ├── TypewriterText.tsx
  │   └── MusicToggle.tsx
  ├── global.css            # Theme colors & animations
  └── App.tsx               # React Router setup

server/
  ├── index.ts              # Express server
  └── routes/
      └── time-together.ts  # Relationship timer API

static/
  ├── video/
  │   └── love.mp4         # Video file (add manually)
  └── audio/
      └── ambient-love.mp3  # Music file (optional)
```

## 🎨 Customization

### Colors & Theme
Edit `client/global.css` and `tailwind.config.ts` to customize:
- Primary color (lavender)
- Secondary color (blush pink)
- Animations and effects

### Relationship Start Date
Update the date in `server/routes/time-together.ts` and `client/components/RelationshipTimer.tsx`:
```typescript
const startDate = new Date(2026, 2, 14, 20, 41, 0); // Feb 14, 2026 at 8:41 PM
```

### Video & Audio Files
Place your files in the `static/` directory:
- Video: `static/video/love.mp4`
- Audio: `static/audio/ambient-love.mp3`

### Love Letter Text
Edit the `loveLetter` string in `client/pages/Index.tsx` with your own message.

### Memories Gallery
Add images to `static/images/` and update the gallery in `Index.tsx`.

## 🔌 API Endpoints

### Time Together
```
GET /api/time-together
```

Returns time elapsed since relationship start date:
```json
{
  "success": true,
  "startDate": "2026-02-14T20:41:00.000Z",
  "currentTime": "2026-04-14T20:41:00.000Z",
  "timeTogether": {
    "days": 31,
    "hours": 0,
    "minutes": 0,
    "seconds": 0,
    "totalSeconds": 2678400
  },
  "message": "..."
}
```

## 🚀 Deployment

### Option 1: Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `pnpm build`
3. Set publish directory: `dist/spa`
4. Deploy!

### Option 2: Vercel
1. Import project from GitHub
2. Vercel auto-detects Vite configuration
3. Deploy with one click!

### Option 3: Self-Hosted
```bash
pnpm build
pnpm start
```

## 🛠️ Development

### Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm test         # Run tests
pnpm typecheck    # TypeScript validation
pnpm format.fix   # Format code
```

## 📦 Technologies

- **Frontend**: React 18 + React Router 6
- **Styling**: TailwindCSS 3 + custom CSS animations
- **Backend**: Express.js
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: CSS keyframes, Framer Motion ready

## 🎵 Optional Features

### Background Music
Add `static/audio/ambient-love.mp3` and enable the music toggle button.

### Animations
- Floating hearts and particles
- Smooth fade-in transitions
- Typewriter text effect
- Hover zoom effects

## 🤝 Support

For issues or feature requests, please update the code directly or reach out.

## 💜 License

Made with love.

---

**Built with ❤️ for someone special**
