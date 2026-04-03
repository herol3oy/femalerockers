import { asc } from "drizzle-orm";
import { Shield } from "lucide-react";

import { db } from "@/app/db";
import { usersTable } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersTable } from "./users-table";

export default async function AdminPage() {
  const users = await db.select().from(usersTable).orderBy(asc(usersTable.isApproved));

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_hsl(var(--secondary))_0%,_transparent_45%),linear-gradient(to_bottom,_hsl(var(--background)),_hsl(var(--muted)/0.35))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Card className="overflow-hidden border-border/70 bg-background/95 shadow-sm">
          <CardHeader className="border-b border-border/60 bg-[linear-gradient(135deg,_hsl(var(--background))_0%,_hsl(var(--secondary)/0.35)_100%)] pb-8">
            <Badge variant="secondary" className="w-fit gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.24em]">
              <Shield className="h-3.5 w-3.5" />
              Admin panel
            </Badge>
            <CardTitle className="text-3xl">All Users</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              Manage user approvals and review profiles across the directory.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {users.length === 0 ? (
              <p className="text-muted-foreground">No users found.</p>
            ) : (
              <UsersTable users={users} />
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
