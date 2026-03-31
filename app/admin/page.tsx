import { asc } from "drizzle-orm";
import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { UsersTable } from "./users-table";

export default async function AdminPage() {
  const users = await db.select().from(usersTable).orderBy(asc(usersTable.isApproved));

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin — All Users</h1>
      {users.length === 0 ? (
        <p className="text-muted-foreground">No users found.</p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  );
}
