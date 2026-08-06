"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { CityCountryCombobox } from "@/components/city-country-combobox";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelectCombobox } from "@/components/ui/combobox";
import { updateProfile } from "./actions";

type Props = {
  profile: {
    email: string;
    username: string;
    artistName: string;
    avatarUrl: string | null;
    cityCountry: string | null;
    mainInstrument: string | null;
    genre: string | null;
    bio: string | null;
    instagramUrl: string | null;
    videoLink: string | null;
    collabStatus: boolean | null;
    newsletterOptIn: boolean;
  };
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2 MB
const MAIN_INSTRUMENT_OPTIONS = [
  "Electric guitar",
  "Bass guitar",
  "Drums",
  "Keyboard",
  "Piano",
  "Synthesizer",
  "Acoustic guitar",
] as const;
const GENRE_OPTIONS = [
  "Classic Rock",
  "Alternative Rock",
  "Hard Rock",
  "Indie Rock",
  "Punk Rock",
  "Progressive Rock",
  "Grunge",
  "Garage Rock",
  "Psychedelic Rock",
  "Pop Rock",
  "Metal",
  "Heavy Metal",
  "Thrash Metal",
  "Death Metal",
  "Black Metal",
  "Power Metal",
  "Doom Metal",
  "Progressive Metal",
  "Nu Metal",
  "Metalcore",
  "Symphonic Metal",
] as const;

function parseValues(value: string | null | undefined) {
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function EditProfileForm({ profile }: Props) {
  const [state, formAction, pending] = useActionState(updateProfile, null);
  const [preview, setPreview] = useState<string | null>(profile.avatarUrl);
  const [fileError, setFileError] = useState<string | null>(null);
  const [collabStatus, setCollabStatus] = useState(profile.collabStatus ?? false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(profile.newsletterOptIn);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(() =>
    parseValues(profile.mainInstrument),
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => parseValues(profile.genre));

  useEffect(() => {
    if (!state?.success || !state.preferences) return;

    setCollabStatus(state.preferences.collabStatus);
    setNewsletterOptIn(state.preferences.newsletterOptIn);
  }, [state]);

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
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex flex-col gap-2">
        <Label htmlFor="avatar">Avatar</Label>
        <div className="flex items-center gap-4">
          {preview ? (
            <Image
              src={preview}
              alt="Avatar preview"
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-primary-foreground">
              {getInitials(profile.artistName)}
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
          readOnly
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">Username cannot be changed.</p>
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
        <CityCountryCombobox defaultValue={profile.cityCountry} placeholder="Search city..." />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mainInstrument">Main Instrument</Label>
        <MultiSelectCombobox
          id="mainInstrument"
          name="mainInstrument"
          options={[...MAIN_INSTRUMENT_OPTIONS]}
          placeholder="Search instruments..."
          value={selectedInstruments}
          onChange={setSelectedInstruments}
          maxSelections={5}
          emptyText="No matching instruments found."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="genre">Genre</Label>
        <MultiSelectCombobox
          id="genre"
          name="genre"
          options={[...GENRE_OPTIONS]}
          placeholder="Search genres..."
          value={selectedGenres}
          onChange={setSelectedGenres}
          maxSelections={5}
          emptyText="No matching genres found."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={profile.bio ?? ""}
          rows={4}
          maxLength={500}
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
        <input type="hidden" name="collabStatus" value={collabStatus ? "true" : "false"} />
        <Checkbox
          id="collabStatus"
          checked={collabStatus}
          onCheckedChange={(checked) => setCollabStatus(checked === true)}
        />
        <Label htmlFor="collabStatus" className="cursor-pointer">
          Open to collaborate
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <input type="hidden" name="newsletterOptIn" value={newsletterOptIn ? "true" : "false"} />
        <Checkbox
          id="newsletterOptIn"
          checked={newsletterOptIn}
          onCheckedChange={(checked) => setNewsletterOptIn(checked === true)}
        />
        <Label htmlFor="newsletterOptIn" className="cursor-pointer">
          I want to receive updates and newsletters via email
        </Label>
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}

      {state?.success && (
        <p
          role="status"
          className="rounded-lg border border-green-500/50 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400"
        >
          Your profile changes have been saved.
        </p>
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
