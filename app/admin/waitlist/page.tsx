import { redirect } from "next/navigation";

export default async function AdminWaitlistPage() {
  redirect("/admin/invitations");
}
