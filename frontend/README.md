# Vibe-a-thon Frontend

This is the frontend of the Vibe-a-thon application, built using [Next.js](https://nextjs.org). The application is designed to facilitate event management, including speaker registration, proposal submissions, and administrative tasks. It leverages modern web technologies and libraries to deliver a seamless user experience.

## Features

### General
- **Next.js Framework**: Utilizes the latest version of Next.js for server-side rendering and static site generation.
- **Tailwind CSS**: Styled with Tailwind CSS for rapid UI development.
- **Radix UI Components**: Implements accessible and customizable UI components.

### Speaker Dashboard
- **Proposal Submission**: Allows speakers to submit their proposals for events.
- **Registration**: Enables speakers to register for the event.
- **Updates**: Provides a platform for speakers to receive updates.

### Admin Dashboard
- **Agenda Builder**: Helps administrators create and manage event agendas.
- **Proposal Review**: Facilitates the review and approval of speaker proposals.
- **Post Updates**: Allows administrators to post updates for the event.

### Authentication
- **NextAuth.js**: Secure authentication system for both speakers and administrators.
- **Dynamic User Management**: Supports dynamic addition of users with hashed passwords.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mannbajpai/mini-juris-at-vibeathon.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build

To create a production build:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## Project Structure

- **app/**: Contains the main application pages and layouts.
- **components/**: Reusable UI components categorized by functionality.
- **lib/**: Utility functions and mock data for the application.
- **public/**: Static assets such as images and icons.

## Configuration

- **`next.config.mjs`**: Next.js configuration file.
- **`postcss.config.mjs`**: PostCSS configuration for Tailwind CSS.
- **`jsconfig.json`**: Path alias configuration.

## Dependencies

### Main Dependencies
- `next`: ^15.5.4
- `react`: ^19.1.0
- `tailwindcss`: ^4
- `next-auth`: ^4.24.11
- `zod`: ^4.1.11

### Dev Dependencies
- `@tailwindcss/postcss`: ^4
- `tw-animate-css`: ^1.4.0

## Learn More

To learn more about the technologies used in this project, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)


