"use client";

import { PauseCircleIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";
import { useActionState, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { deactivateAccount, deleteAccount } from "./actions";

const deletionReasons = [
  ["privacy_concerns", "I have privacy concerns"],
  ["not_useful", "The platform is not useful to me"],
  ["not_enough_activity", "There is not enough community activity"],
  ["too_many_messages", "I receive too many messages or emails"],
  ["technical_issues", "I experienced technical problems"],
  ["taking_a_break", "I am taking a break"],
  ["other", "Another reason"],
] as const;

export function AccountManagement() {
  const [deactivateState, deactivateAction, deactivating] = useActionState(
    deactivateAccount,
    null,
  );
  const [deleteState, deleteAction, deleting] = useActionState(
    deleteAccount,
    null,
  );
  const [reason, setReason] = useState("");
  const [confirmation, setConfirmation] = useState("");

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/70 bg-muted/20 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2">
              <PauseCircleIcon className="size-5 text-muted-foreground" />
              <h2 className="font-semibold">Deactivate account</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Temporarily hide your profile and all activity. Your information
              is preserved and will return when you reactivate.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Deactivate</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Deactivate your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your public profile and contributions will disappear
                  immediately, and you will be signed out on every device. Sign
                  in again whenever you want to reactivate.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form action={deactivateAction}>
                {deactivateState?.error ? (
                  <p className="mb-4 text-sm text-destructive">
                    {deactivateState.error}
                  </p>
                ) : null}
                <AlertDialogFooter>
                  <AlertDialogCancel type="button">
                    Keep active
                  </AlertDialogCancel>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={deactivating}
                  >
                    {deactivating ? "Deactivating…" : "Deactivate account"}
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="flex items-center gap-2 text-destructive">
              <TrashIcon className="size-5" />
              <h2 className="font-semibold">Delete profile</h2>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Permanently erase your account, profile, contributions, and
              uploaded images. This cannot be undone.
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete profile</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-xl">
              <form action={deleteAction} className="space-y-5">
                <AlertDialogHeader>
                  <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive sm:mx-0">
                    <WarningIcon className="size-6" />
                  </div>
                  <AlertDialogTitle>
                    Permanently delete your profile?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Please complete this short exit survey. Your response is
                    stored without your user ID, email, or username.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-3">
                  <Label>Why are you leaving?</Label>
                  <RadioGroup
                    name="reason"
                    value={reason}
                    onValueChange={setReason}
                    required
                  >
                    {deletionReasons.map(([value, label]) => (
                      <Label
                        key={value}
                        htmlFor={`reason-${value}`}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 p-3 font-normal hover:bg-muted/30"
                      >
                        <RadioGroupItem
                          id={`reason-${value}`}
                          value={value}
                          className="mt-0.5"
                        />
                        <span>{label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deletion-details">
                    Anything else you would like us to know?{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="deletion-details"
                    name="details"
                    maxLength={500}
                    rows={4}
                    placeholder="Please do not include personal information."
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum 500 characters.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delete-confirmation">
                    Enter <span className="font-semibold">DELETE</span> to
                    confirm
                  </Label>
                  <Input
                    id="delete-confirmation"
                    name="confirmation"
                    autoComplete="off"
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                  />
                </div>

                {deleteState?.error ? (
                  <p className="text-sm text-destructive">
                    {deleteState.error}
                  </p>
                ) : null}

                <AlertDialogFooter>
                  <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
                  <Button
                    type="submit"
                    variant="destructive"
                    disabled={deleting || !reason || confirmation !== "DELETE"}
                  >
                    {deleting ? "Deleting…" : "Permanently delete"}
                  </Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
