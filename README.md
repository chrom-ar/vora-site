# My V0 Project

A modern web application built with Next.js 15, React 19, and TypeScript.

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Available Scripts

- **Development**: Start the development server
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **Build**: Create a production build
  ```bash
  npm run build
  ```

- **Start**: Start the production server
  ```bash
  npm run start
  ```

- **Lint**: Run ESLint to check code quality
  ```bash
  npm run lint
  ```

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with CSS animations
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts
- **Theme**: Next Themes for dark/light mode
- **Additional**: 
  - Date handling with date-fns
  - Carousel with Embla
  - Toast notifications with Sonner
  - Resizable panels

## Development

The project uses modern React patterns and includes a comprehensive UI component library built on Radix UI primitives. All components are styled with Tailwind CSS and support both light and dark themes.

## Project Structure

```
├── app/           # Next.js app directory
├── components/    # Reusable components
│   └── ui/       # UI component library
├── lib/          # Utility functions
├── public/       # Static assets
└── styles/       # Global styles
```

