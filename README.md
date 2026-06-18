# Acadex Landing Page

A React + Vite landing page starter with a Firebase-ready client scaffold.

## What It Includes

- Responsive landing page layout for mobile, tablet, and desktop
- Conversion-focused hero, feature blocks, and Firebase setup guidance
- Environment-driven Firebase client module for Firestore and auth work
- Vite-based TypeScript frontend for fast local development

## Setup

1. Copy `.env.example` to `.env.local`.
2. Replace the placeholder Firebase values with your project configuration.
3. Install dependencies if needed with `npm install`.

## Available Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run lint` runs ESLint across the workspace.

## Firebase Notes

The Firebase client is initialized in `src/lib/firebase.ts` and only connects when the required environment variables are present. Until then, the landing page still renders normally and shows the Firebase status as waiting for configuration.