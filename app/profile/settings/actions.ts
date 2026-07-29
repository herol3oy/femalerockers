"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/app/db";
import {
  ACCOUNT_DELETION_REASONS,
  accountDeletionFeedbackTable,
  type AccountDeletionReason,
  collaborationsTable,
  usersTable,
} from "@/app/db/schema";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type AccountActionState = {
  error?: string;
};

async function removeStorageFolder(
  admin: ReturnType<typeof createAdminClient>,
  bucket: "avatars" | "collab-covers",
  userId: string,
) {
  while (true) {
    const { data, error } = await admin.storage
      .from(bucket)
      .list(userId, { limit: 100, offset: 0 });

    if (error) {
      throw new Error(`Could not list ${bucket} files: ${error.message}`);
    }

    const paths = (data ?? [])
      .filter((entry) => entry.id)
      .map((entry) => `${userId}/${entry.name}`);

    if (paths.length === 0) {
      return;
    }

    const { error: removeError } = await admin.storage
      .from(bucket)
      .remove(paths);

    if (removeError) {
      throw new Error(
        `Could not remove ${bucket} files: ${removeError.message}`,
      );
    }
  }
}

export async function deactivateAccount(
  _previousState: AccountActionState | null,
  _formData: FormData,
): Promise<AccountActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [account] = await db
    .update(usersTable)
    .set({ deactivatedAt: new Date() })
    .where(eq(usersTable.id, user.id))
    .returning({ id: usersTable.id });

  if (!account) {
    return { error: "Your account could not be found." };
  }

  const { error: signOutError } = await supabase.auth.signOut({
    scope: "global",
  });

  if (signOutError) {
    console.error(
      "Failed to revoke sessions during deactivation",
      signOutError,
    );
  }

  revalidatePath("/");
  redirect("/auth/login?deactivated=1");
}

export async function reactivateAccount(
  _previousState: AccountActionState | null,
  _formData: FormData,
): Promise<AccountActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const [account] = await db
    .update(usersTable)
    .set({ deactivatedAt: null })
    .where(eq(usersTable.id, user.id))
    .returning({ id: usersTable.id });

  if (!account) {
    return { error: "Your account could not be found." };
  }

  revalidatePath("/");
  redirect("/profile");
}

export async function deleteAccount(
  _previousState: AccountActionState | null,
  formData: FormData,
): Promise<AccountActionState> {
  const reason = formData.get("reason")?.toString();
  const details = formData.get("details")?.toString().trim() || null;
  const confirmation = formData.get("confirmation")?.toString();

  if (
    !reason ||
    !ACCOUNT_DELETION_REASONS.includes(reason as AccountDeletionReason)
  ) {
    return { error: "Please select why you are leaving." };
  }

  if (details && details.length > 500) {
    return { error: "Additional feedback must be 500 characters or fewer." };
  }

  if (confirmation !== "DELETE") {
    return { error: "Enter DELETE exactly as shown to confirm." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  let admin: ReturnType<typeof createAdminClient>;
  try {
    admin = createAdminClient();
  } catch (error) {
    console.error("Supabase admin client is not configured", error);
    return {
      error:
        "Account deletion is temporarily unavailable. Please contact support.",
    };
  }

  const [account] = await db
    .update(usersTable)
    .set({ deactivatedAt: new Date() })
    .where(eq(usersTable.id, user.id))
    .returning({ id: usersTable.id });

  if (!account) {
    return { error: "Your account could not be found." };
  }

  try {
    await Promise.all([
      removeStorageFolder(admin, "avatars", user.id),
      removeStorageFolder(admin, "collab-covers", user.id),
    ]);

    const { error: signOutError } = await supabase.auth.signOut({
      scope: "global",
    });
    if (signOutError) {
      throw signOutError;
    }

    const { error: deleteUserError } = await admin.auth.admin.deleteUser(
      user.id,
      false,
    );
    if (deleteUserError) {
      throw deleteUserError;
    }

    await db.transaction(async (tx) => {
      await tx.insert(accountDeletionFeedbackTable).values({
        reason,
        details,
      });
      await tx
        .delete(collaborationsTable)
        .where(eq(collaborationsTable.userId, user.id));
      await tx.delete(usersTable).where(eq(usersTable.id, user.id));
    });
  } catch (error) {
    console.error(`Account deletion failed for user ${user.id}`, error);
    return {
      error:
        "We could not finish deleting your account. It remains hidden; please retry or contact support.",
    };
  }

  revalidatePath("/");
  redirect("/auth/login?deleted=1");
}
