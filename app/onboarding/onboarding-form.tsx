"use client";

import { useActionState, useState } from "react";
import { USER_ROLES } from "@/app/db/schema";
import { CityCountryCombobox } from "@/components/city-country-combobox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROLE_CONFIGS } from "@/lib/roles";
import { completeOnboarding } from "./actions";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

export function OnboardingForm({ invitationToken }: { invitationToken: string }) {
  const [state, formAction, pending] = useActionState(completeOnboarding, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const roleConfig = selectedRole ? ROLE_CONFIGS[selectedRole as keyof typeof ROLE_CONFIGS] : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_AVATAR_SIZE) {
        setFileError("Avatar must be under 2 MB.");
        e.target.value = "";
        return;
      }
      setFileError(null);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Complete your profile</h1>
          <p className="text-sm text-muted-foreground">
            Choose your role and fill in the details to get started on Female Rockers.
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <input type="hidden" name="invitationToken" value={invitationToken} />
          <div className="flex flex-col gap-3">
            <Label className="text-base font-semibold">
              I am a… <span className="text-destructive">*</span>
            </Label>
            <RadioGroup name="role" value={selectedRole} onValueChange={setSelectedRole} required>
              {USER_ROLES.map((role) => {
                const config = ROLE_CONFIGS[role];
                return (
                  <Label
                    key={role}
                    htmlFor={`role-${role}`}
                    className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-accent has-[:checked]:border-primary has-[:checked]:bg-accent/50"
                  >
                    <RadioGroupItem value={role} id={`role-${role}`} className="mt-0.5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-sm">{config.label}</span>
                      <span className="text-xs text-muted-foreground">{config.description}</span>
                    </div>
                  </Label>
                );
              })}
            </RadioGroup>
          </div>

          {selectedRole && (
            <>
              <hr className="border-border" />

              <div className="flex flex-col gap-2">
                <Label htmlFor="avatar">Avatar (optional)</Label>
                <div className="flex items-center gap-4">
                  {preview ? (
                    <picture>
                      <img
                        src={preview}
                        alt="Avatar preview"
                        className="h-16 w-16 rounded-2xl object-cover"
                      />
                    </picture>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-sm text-muted-foreground">
                      Photo
                    </div>
                  )}
                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                    className="max-w-64"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Max 2 MB. PNG, JPEG, or WebP.</p>
                {fileError && <p className="text-sm text-destructive">{fileError}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="username">
                  Username <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="e.g. jane_rocks"
                  required
                  minLength={3}
                  maxLength={50}
                  pattern="^[a-zA-Z0-9_]+$"
                />
                <p className="text-xs text-muted-foreground">
                  Letters, numbers, and underscores only. This will be your public URL and cannot be
                  changed later.
                </p>
              </div>

              {roleConfig?.fields.map((field) => {
                if (field.type === "checkbox") {
                  return (
                    <div key={field.id} className="flex items-center gap-2">
                      <Checkbox id={field.id} name={field.id} value="on" />
                      <Label htmlFor={field.id} className="cursor-pointer">
                        {field.label}
                      </Label>
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.id} className="flex flex-col gap-2">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-destructive"> *</span>}
                      </Label>
                      <textarea
                        id={field.id}
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                  );
                }

                if (field.type === "combobox") {
                  return (
                    <div key={field.id} className="flex flex-col gap-2">
                      <Label htmlFor={field.id}>
                        {field.label}
                        {field.required && <span className="text-destructive"> *</span>}
                      </Label>
                      <CityCountryCombobox
                        name={field.id}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    </div>
                  );
                }

                return (
                  <div key={field.id} className="flex flex-col gap-2">
                    <Label htmlFor={field.id}>
                      {field.label}
                      {field.required && <span className="text-destructive"> *</span>}
                    </Label>
                    <Input
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      required={field.required}
                      maxLength={field.id === "artistName" ? 100 : 255}
                    />
                  </div>
                );
              })}

              <div className="flex items-center gap-2">
                <Checkbox
                  id="newsletterOptIn"
                  name="newsletterOptIn"
                  checked={newsletter}
                  onCheckedChange={(checked) => setNewsletter(checked === true)}
                  value="on"
                />
                <Label htmlFor="newsletterOptIn" className="cursor-pointer">
                  I want to receive updates and newsletters via email
                </Label>
              </div>
            </>
          )}

          {state?.error && <p className="text-sm text-destructive">{state.error}</p>}

          <Button type="submit" disabled={pending || !selectedRole}>
            {pending ? "Saving…" : "Complete Setup"}
          </Button>
        </form>
      </div>
    </main>
  );
}
