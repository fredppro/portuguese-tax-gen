# Portuguese Tax Gen - Devcontainer Setup and Database Configuration

Help freelancers track income/expenses and understand their monthly tax obligations under Portuguese rules.

## Devcontainer Environment

This workspace is running in a **dev container** based on **Debian GNU/Linux 12 (bookworm)**. The following tools and configurations are pre-installed and available:

### Pre-installed Tools

- **Git**: Up-to-date version, built from source if needed.
- **Node.js**: Includes `node`, `npm`, and `eslint` for JavaScript/TypeScript development.
- **TypeScript**: Includes the TypeScript compiler (`tsc`).
- **Command-line Tools**: Includes tools like `apt`, `dpkg`, `curl`, `wget`, `ssh`, `rsync`, `gpg`, `ps`, `lsof`, `netstat`, `tree`, `find`, `grep`, `zip`, `tar`, and more.

### Database Configuration

1. **Environment Variable Validation:**

- The `DATABASE_URL` is validated using `zod` to ensure it is a valid URL.
- If validation fails, the application will throw an error during initialization.

2. **SSL Configuration:**

- SSL is disabled (`ssl: false`) for local development in the devcontainer.

3. **Schema and Migrations:**

- The database schema is defined in `src/db/schema.ts`.
- Migrations are generated and stored in the `drizzle/migrations` directory.

4. **Generate Migrations:**

- If you have made changes to the database schema, generate a new migration file:
  `npx drizzle-kit push`, or `npx drizzle-kit generate` and `npx drizzle-kit migrate`

5. **Seeding:**
   Run the seed script to populate the database with initial data:
   `npx tsx src/db/seed.ts`

6. **Verify the Data:**
   To verify that the database has been seeded correctly, you can log the data using `npx tsx src/db/index.ts`
