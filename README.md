# fwk-22-a-frontend

React/Vite frontend for Gomoku-PL. Connects to backend for game logic, user data, and GDPR features. Includes Storybook for UI components.

## Features
- Play Gomoku with real-time multiplayer
- Board, Sidebar, StatusBar, AccountSettings, Home pages
- Error feedback, restart, undo, bot mode
- GDPR support: data access, portability, consent, retention, deletion
- Storybook stories for all major components

## Setup
1. Install dependencies:
	```sh
	npm install
	```
2. Start development server:
	```sh
	npm run dev
	```
3. Start Storybook:
	```sh
	npm run storybook
	```

## Usage
- Main app: `src/App.jsx`, `src/pages/`
- Components: from `@gomoku/components` or local `src/components/`
- See Storybook for usage examples and props

## Scripts
- `npm run format:repo` — Format all code/config files with Prettier
- `npm run strip:comments` — Remove comments from all source files
- `npm run lint` — Run ESLint
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## GDPR Features
- Data access, portability, consent, retention, deletion UI
- Integrates with backend GDPR endpoints

## Development
- Source: `src/`
- Stories: `.storybook/`, `public/stories/`
- Scripts: `scripts/`

## License
ISC
