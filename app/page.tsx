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
