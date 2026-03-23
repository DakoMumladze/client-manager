# Client Manager

A full-stack client management system built with Next.js, React, TypeScript, and Tailwind CSS. Manage clients, projects, and tasks with a clean SaaS-style interface.

## Features

### Authentication

- Sign up, login, and logout
- Forgot password flow
- Protected routes — dashboard requires authentication

### User Profile

- View and update profile (name, avatar)
- Change password
- File upload for avatar

### Clients Management (CRUD)

- Create, edit, delete, and view client details
- Search and filter by name or status
- Client status: **Lead** | **Active** | **Archived**
- Notes field per client

### Projects Management

- Each client can have multiple projects (one-to-many)
- Create, edit, and delete projects
- Project status: **In Progress** | **Completed** | **On Hold**
- Deadline date and budget tracking
- Project description

### Tasks Management

- Tasks linked to a project (nested relations)
- Title, description, priority (**Low** | **Medium** | **High**), and due date
- Completed checkbox
- Sort by priority or due date

### Dashboard

- Total clients, active projects, tasks due today
- Completed tasks percentage
- Charts (bar/pie) for data visualization

### UI/UX

- Sidebar navigation
- Responsive layout
- Toast notifications
- Loading states and error handling
- Confirmation modals for destructive actions

## Planned Add-Ons

- File uploads for clients/projects
- Activity log
- Dark/light mode toggle
- Team members and roles
- Stripe test subscription
- Email notifications

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
