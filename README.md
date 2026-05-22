# Client Manager

A full-stack client management system built with Next.js, React, TypeScript, and Tailwind CSS. Manage clients, projects, and tasks with a clean SaaS-style interface.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Linting:** ESLint
- **Package Manager:** pnpm

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

### 3. Deploy database migrations

Install the Supabase CLI, initialize the project, link it to your remote project, and push the migration:

```bash
# Link the Supabase project
npx supabase link --project-ref <your-project-ref>

# Push migrations to your remote database
npx supabase db push
```

This creates the `profiles` table, RLS policies, auto-profile-creation trigger, and `avatars` storage bucket.

### 4. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command      | Description             |
| ------------ | ----------------------- |
| `pnpm dev`   | Start dev server        |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint`  | Run ESLint              |
