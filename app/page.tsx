import Link from "next/link";
import { Header } from "@/components/header";
import { createClient } from "@/lib/supabase/server";

const features = [
  {
    title: "Client Tracking",
    description:
      "Organize your clients by status — leads, active, and archived. Add notes and keep everything in one place.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-1.053M18 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.75 8.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Project Management",
    description:
      "Create projects for each client with budgets, deadlines, and status tracking. See progress at a glance.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
      </svg>
    ),
  },
  {
    title: "Task Tracking",
    description:
      "Break projects into tasks with priorities and due dates. Mark them complete and track your progress.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    title: "Dashboard & Insights",
    description:
      "See totals, completion rates, and charts at a glance. Know exactly where things stand across all clients.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pt-24 pb-20 text-center">
        <p className="mb-4 text-sm font-medium tracking-wide text-blue-500 uppercase">
          Client Management Made Simple
        </p>
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-stone-800 sm:text-6xl">
          All your clients,
          <br />
          projects & tasks
          <br />
          <span className="text-blue-500">in one place.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-500">
          A clean, simple tool to manage your client relationships, track
          projects, and stay on top of every task.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          {user ? (
            <Link
              href="/profile"
              className="inline-flex h-12 items-center rounded-lg bg-blue-500 px-8 text-base font-medium text-white transition-colors hover:bg-blue-600"
            >
              Go to dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/auth/sign-up"
                className="inline-flex h-12 items-center rounded-lg bg-blue-500 px-8 text-base font-medium text-white transition-colors hover:bg-blue-600"
              >
                Get started free
              </Link>
              <Link
                href="/auth/sign-in"
                className="inline-flex h-12 items-center rounded-lg border border-stone-200 bg-white px-8 text-base font-medium text-stone-700 transition-colors hover:bg-stone-50"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-stone-100 bg-stone-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-center text-3xl font-bold text-stone-800">
            Everything you need
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-stone-500">
            Simple tools to keep your freelance or agency workflow organized
            from start to finish.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-500">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-800">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold text-stone-800">
            {user ? "Your workspace is ready" : "Ready to get organized?"}
          </h2>
          <p className="mt-3 text-stone-500">
            {user
              ? "Head to your dashboard to manage clients, projects, and tasks."
              : "Start managing your clients today. Free to use, no credit card required."}
          </p>
          <Link
            href={user ? "/profile" : "/auth/sign-up"}
            className="mt-8 inline-flex h-12 items-center rounded-lg bg-blue-500 px-8 text-base font-medium text-white transition-colors hover:bg-blue-600"
          >
            {user ? "Go to dashboard" : "Create your account"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-stone-400">
          Client Manager
        </div>
      </footer>
    </div>
  );
}
