"use client";

import { useTransition } from "react";
import type { SelectUser } from "@/app/db/schema";
import { toggleApproval } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function UsersTable({ users }: { users: SelectUser[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="p-2">Username</th>
            <th className="p-2">Artist Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Approved</th>
            <th className="p-2">Actions</th>
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
    <tr className="border-b">
      <td className="p-2">
        <a
          href={`/discover/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70"
        >
          {user.username}
        </a>
      </td>
      <td className="p-2">{user.artistName}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2">
        <Badge variant={user.isApproved ? "default" : "destructive"}>
          {user.isApproved ? "Yes" : "No"}
        </Badge>
      </td>
      <td className="p-2">
        <Button
          size="sm"
          variant={user.isApproved ? "destructive" : "default"}
          disabled={isPending}
          onClick={handleToggle}
        >
          {isPending
            ? "Saving…"
            : user.isApproved
              ? "Revoke"
              : "Approve"}
        </Button>
      </td>
    </tr>
  );
}
