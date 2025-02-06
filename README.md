# Next.js, Nestjs, TRPC, LLM Monorepo

A full-stack TypeScript monorepo template featuring Next.js for the frontend, NestJS for the backend, and tRPC for type-safe API communication. This project also includes integration with Language Learning Models (LLM).

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Backend**: NestJS with Fastify
- **API**: tRPC for end-to-end typesafe APIs
- **LLM Integration**: AI/ML capabilities
- **Package Manager**: pnpm
- **Build Tool**: Turborepo

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/RazvanRauta/nestjs-nextjs-trpc-llm.git
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development servers:

```bash
pnpm dev
```

## Project Structure

```markdown
├── apps
│   ├── client          # Next.js frontend
│   └── server          # NestJS backend
├── packages            # Shared packages
│   └── api            # tRPC router definitions
└── package.json       # Root package.json
```

## Development

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- API Documentation: http://localhost:3001/trpc-playground

##Features

- ⚡️ Full-stack TypeScript
- 🔗 End-to-end type safety with tRPC
- 🤖 LLM integration ready
- 🏃‍♂️ Fast development with hot reload
- 📦 Monorepo architecture