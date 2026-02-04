# Campus Shark Tank Platform

A comprehensive student entrepreneurship platform built with Next.js, enabling students to pitch innovative ideas, receive peer feedback, and secure micro-funding.

## Features

- 🚀 **Pitch Creation** - Students can create and submit business pitches
- 💰 **Micro-Funding** - Secure funding from the community
- 👥 **Community Feedback** - Get valuable insights from peers and mentors
- 📊 **Admin Dashboard** - Comprehensive management tools
- 🔐 **Authentication** - Secure user authentication system
- 💳 **Wallet System** - Integrated investment and transaction tracking

## Tech Stack

- **Framework**: Next.js 14
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Typography**: Geist Sans/Mono, Manrope

## Getting Started

### Prerequisites

- Node.js 18+ or npm/pnpm/bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install --legacy-peer-deps
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── admin/          # Admin dashboard pages
│   ├── auth/           # Authentication pages
│   ├── pitch/          # Pitch pages
│   ├── wallet/         # Wallet and investment pages
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # UI components
│   ├── auth/          # Auth components
│   ├── pitch/         # Pitch components
│   └── wallet/        # Wallet components
├── data/              # Data and constants
├── lib/               # Utility functions
└── public/            # Static assets
```

## License

All rights reserved.