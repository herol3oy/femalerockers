"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

type Props = {
  profile: {
    email: string;
    username: string;
    artistName: string;
    cityCountry: string | null;
    mainInstrument: string | null;
    genre: string | null;
    bio: string | null;
    instagramUrl: string | null;
    videoLink: string | null;
    collabStatus: boolean | null;
  };
};

export function EditProfileForm({ profile }: Props) {
  const [state, formAction, pending] = useActionState(updateProfile, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          defaultValue={profile.email}
          readOnly
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={profile.username}
          required
          minLength={3}
          maxLength={50}
          pattern="^[a-zA-Z0-9_]+$"
        />
        <p className="text-xs text-muted-foreground">
          Letters, numbers, and underscores only.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="artistName">Artist Name</Label>
        <Input
          id="artistName"
          name="artistName"
          defaultValue={profile.artistName}
          required
          maxLength={100}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="cityCountry">City / Country</Label>
        <Input
          id="cityCountry"
          name="cityCountry"
          defaultValue={profile.cityCountry ?? ""}
          maxLength={100}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mainInstrument">Main Instrument</Label>
        <Input
          id="mainInstrument"
          name="mainInstrument"
          defaultValue={profile.mainInstrument ?? ""}
          maxLength={50}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          name="genre"
          defaultValue={profile.genre ?? ""}
          maxLength={50}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio ?? ""}
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="instagramUrl">Instagram URL</Label>
        <Input
          id="instagramUrl"
          name="instagramUrl"
          defaultValue={profile.instagramUrl ?? ""}
          maxLength={255}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="videoLink">Video Link</Label>
        <Input
          id="videoLink"
          name="videoLink"
          defaultValue={profile.videoLink ?? ""}
          maxLength={255}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="collabStatus"
          name="collabStatus"
          defaultChecked={profile.collabStatus ?? false}
          value="on"
        />
        <Label htmlFor="collabStatus" className="cursor-pointer">
          Open to collaborate
        </Label>
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/profile">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
