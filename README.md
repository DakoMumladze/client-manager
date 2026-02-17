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

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

| Command | Description |
|------------|--------------------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Create production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
