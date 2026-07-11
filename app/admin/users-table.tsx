"use client";

import { useTransition } from "react";
import { toggleApproval } from "@/app/admin/actions";
import type { SelectUser } from "@/app/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRoleLabel } from "@/lib/roles";

export function UsersTable({ users }: { users: SelectUser[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left">
            <th className="px-4 py-3 font-medium">Username</th>
            <th className="px-4 py-3 font-medium">Artist Name</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Approved</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }: { user: SelectUser }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleApproval(user.id, !user.isApproved);
    });
  };

  return (
    <tr className="border-b border-border/60 transition-colors hover:bg-muted/30">
      <td className="px-4 py-3">
        <a
          href={`/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
        >
          {user.username}
        </a>
      </td>
      <td className="px-4 py-3">{user.artistName}</td>
      <td className="px-4 py-3">
        <Badge variant="secondary">{getRoleLabel(user.role)}</Badge>
      </td>
      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
      <td className="px-4 py-3">
        <Badge variant={user.isApproved ? "default" : "destructive"}>
          {user.isApproved ? "Yes" : "No"}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Button
          size="sm"
          variant={user.isApproved ? "destructive" : "default"}
          disabled={isPending}
          onClick={handleToggle}
        >
          {isPending ? "Saving…" : user.isApproved ? "Revoke" : "Approve"}
        </Button>
      </td>
    </tr>
  );
}
