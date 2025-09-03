# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "拍拍" (Pi Pi), an online psychological counseling platform built with Next.js 13, TypeScript, and Redux Toolkit. The platform connects users with professional counselors for online consultations through chat, video calls, and scheduling systems.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Architecture Overview

### Core Technologies
- **Frontend**: Next.js 13 with React 18, TypeScript
- **State Management**: Redux Toolkit with RTK Query for API calls
- **Styling**: Tailwind CSS with Ant Design components
- **Real-time Communication**: SignalR for chat functionality
- **Payments**: 藍新金流 (Newebpay) integration
- **Video Conferencing**: Zoom integration
- **Animations**: GSAP for smooth transitions

### Folder Structure

- **`src/common/`**: Shared components, helpers, hooks, Redux store
  - `components/`: Reusable UI components (Header, Footer, ChatRoom, Loading)
  - `helpers/`: Utility functions for data conversion and custom alerts
  - `hooks/`: Custom React hooks for loading states
  - `redux/`: Complete Redux setup with feature slices and RTK Query services
  
- **`src/modules/`**: Page-specific components organized by feature
  - `Home/`: Landing page components (Banner, Topics, Counselor cards)
  - `counselorCenter/`: Counselor dashboard and management
  - `userCenter/`: User dashboard and reservation management
  - `login/`, `signup/`: Authentication components
  - `shoppingCart/`: Payment and checkout flow

- **`src/pages/`**: Next.js pages following file-based routing
  - API routes in `pages/api/` for payment callbacks
  - Dynamic routes like `[id].tsx` for counselor profiles

- **`src/lib/`**: Static data and configuration
- **`src/types/`**: TypeScript interface definitions

### Redux Architecture

The application uses Redux Toolkit with a comprehensive setup:
- **Feature slices**: UI state management (loading, modals, tabs)
- **RTK Query services**: API calls organized by feature (login, userCenter, counselorCenter)
- **Middleware**: Configured for all RTK Query services in `store.ts`

### Key Features

1. **Dual User Types**: Regular users and counselors with different workflows
2. **Real-time Chat**: SignalR integration for counselor-user communication
3. **Appointment System**: Complex scheduling with time slots and availability
4. **Payment Integration**: 藍新金流 for secure transactions
5. **Video Consultations**: Zoom integration with meeting links
6. **Responsive Design**: Mobile-first approach with Tailwind CSS

### Development Notes

- MSW (Mock Service Worker) is configured but commented out in `_app.tsx`
- The app uses next-redux-wrapper for SSR Redux integration
- TypeScript interfaces are centralized in `src/types/interface.ts`
- Custom loading states managed through Redux for smooth UX
- ESLint and Prettier configured with Airbnb TypeScript rules

### Git Workflow

The project follows a customized GitHub Flow with specific commit message formats:
- `[Feat]` for new features
- `[Fix]` for bug fixes  
- `[Style]` for styling changes
- `[Update]` for file updates
- `[Refactor]` for code refactoring
- `[Hotfix]` for urgent fixes

Branch naming: `Type/ComponentName` (e.g., `Feat/OrderStep`)

## Important Notes

- 回覆時，統一使用台灣的繁體中文進行回答