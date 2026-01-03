# Next.js + Drizzle + Neon DB

Complete setup guide for integrating Drizzle ORM with Neon Database in a Next.js project.

## Installation

Install the required dependencies:

```bash
npm i drizzle-orm @neondatabase/serverless dotenv
npm i -D drizzle-kit
```

## Setup Steps

### 1. Create Environment File

Create a `.env` file in the root of your project and add your Neon database connection string:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

You can find your connection string in your Neon dashboard under the "Connection Details" section.

### 2. Create Drizzle Configuration

Create `drizzle.config.ts` in the root directory:

```typescript
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

### 3. Create Schema File

Create a `drizzle` directory and add `schema.ts`:

```typescript
import { pgTable, uuid, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
})

export type Users = typeof users.$inferSelect;
```

### 4. Create Database Client

Create `drizzle/index.ts` to export your database client:

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
```

### 5. Push Schema to Database

Push your schema directly to the database (this avoids dealing with migrations):

```bash
npx drizzle-kit push
```

## Usage

Import and use the database client in your Next.js components or API routes. Here's an example using `app/page.tsx`:

```typescript
import { db } from "@/drizzle";
import { users } from "@/drizzle/schema";

export default async function Home() {
  const data = await db.select().from(users)

  return (
    <div>
      <h1>{data[0].name}</h1>
    </div>
  );
}
```