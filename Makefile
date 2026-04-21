.PHONY: up down reset status logs migration push pull types dev build

# ── Local dev ────────────────────────────────────────────────────────────────

## Start local Supabase stack
up:
	npx supabase start

## Stop local Supabase stack
down:
	npx supabase stop

## Stop and remove all local data volumes
clean:
	npx supabase stop --no-backup

## Reset local DB: drop, recreate, run all migrations + seed
reset:
	npx supabase db reset

## Show running service status and local API URLs
status:
	npx supabase status

## Tail logs for all services (pass service=db|api|auth|storage to filter)
logs:
	npx supabase logs $(if $(service),--service $(service),)

# ── Migrations ───────────────────────────────────────────────────────────────

## Create a new migration: make migration name=create_projects
migration:
	@test -n "$(name)" || (echo "Usage: make migration name=<migration_name>" && exit 1)
	npx supabase migration new $(name)

## Push local migrations to remote (linked) project
push:
	npx supabase db push

## Pull remote schema changes into a new migration file
pull:
	npx supabase db pull

## Show diff between local migrations and remote DB
diff:
	npx supabase db diff

# ── Types ────────────────────────────────────────────────────────────────────

## Generate TypeScript types from local DB schema
types:
	npx supabase gen types typescript --local > lib/database.types.ts
	@echo "Types written to lib/database.types.ts"

## Generate TypeScript types from remote (linked) project
types-remote:
	npx supabase gen types typescript --linked > lib/database.types.ts
	@echo "Types written to lib/database.types.ts"

# ── Deployment ───────────────────────────────────────────────────────────────

## Link to a remote Supabase project: make link project=<project-ref>
link:
	@test -n "$(project)" || (echo "Usage: make link project=<project-ref>" && exit 1)
	npx supabase link --project-ref $(project)

## Deploy: push migrations then generate fresh types
deploy:
	npx supabase db push
	$(MAKE) types-remote

# ── Next.js ──────────────────────────────────────────────────────────────────

## Start Next.js dev server
dev:
	pnpm dev

## Build Next.js for production
build:
	pnpm build

## Help: list all targets
help:
	@grep -E '^##' Makefile | sed 's/## //'
