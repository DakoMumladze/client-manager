import Link from "next/link";
import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/server";

const features = [
  {
    title: "Client Tracking",
    description:
      "Organize your clients by status — leads, active, and archived. Add notes and keep everything in one place.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-1.053M18 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.75 8.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Project Management",
    description:
      "Create projects for each client with budgets, deadlines, and status tracking. See progress at a glance.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
        />
      </svg>
    ),
  },
  {
    title: "Task Tracking",
    description:
      "Break projects into tasks with priorities and due dates. Mark them complete and track your progress.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Dashboard & Insights",
    description:
      "See totals, completion rates, and charts at a glance. Know exactly where things stand across all clients.",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
        />
      </svg>
    ),
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const primaryCta =
    "inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90";
  const secondaryCta =
    "inline-flex h-11 items-center justify-center rounded-lg border border-border bg-card px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 50% 0%, rgba(168,85,247,0.22), transparent)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 pt-24 pb-20 text-center duration-700 animate-in fade-in-0 slide-in-from-bottom-4 sm:pt-32">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Client Management Made Simple
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            All your clients,
            <br />
            projects &amp; tasks{" "}
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              in one place.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            A clean, fast tool to manage your client relationships, track
            projects, and stay on top of every task.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            {user ? (
              <Link href="/dashboard" className={primaryCta}>
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/sign-up" className={primaryCta}>
                  Get started free
                </Link>
                <Link href="/auth/sign-in" className={secondaryCta}>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Everything you need
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Simple tools to keep your freelance or agency workflow organized
            from start to finish.
          </p>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card px-6 py-14 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 70% at 50% 0%, rgba(168,85,247,0.15), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight">
              {user ? "Your workspace is ready" : "Ready to get organized?"}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              {user
                ? "Head to your dashboard to manage clients, projects, and tasks."
                : "Start managing your clients today. Free to use, no credit card required."}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href={user ? "/dashboard" : "/auth/sign-up"}
                className={primaryCta}
              >
                {user ? "Go to dashboard" : "Create your account"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted-foreground">
          Client Manager
        </div>
      </footer>
    </div>
  );
}
