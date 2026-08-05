"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitCollab } from "./actions";

type Props = {
  defaultBio: string;
};

const MAX_COVER_SIZE = 5 * 1024 * 1024;

export function CollabForm({ defaultBio }: Props) {
  const [state, formAction, pending] = useActionState(submitCollab, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_COVER_SIZE) {
        setFileError("Cover photo must be under 5 MB.");
        e.target.value = "";
        return;
      }
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setFileError("Cover photo must be PNG, JPEG, or WebP.");
        e.target.value = "";
        return;
      }
      setFileError(null);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-lg">
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Short Bio *</Label>
        <textarea
          id="bio"
          name="bio"
          defaultValue={defaultBio}
          required
          rows={4}
          placeholder="Personal background, career highlights, musical direction…"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="pieceType">Piece Type *</Label>
        <select
          id="pieceType"
          name="pieceType"
          required
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="" disabled>
            Select type…
          </option>
          <option value="original">Original</option>
          <option value="cover">Cover</option>
        </select>
        <p className="text-xs text-muted-foreground">
          If it&apos;s a cover, we recommend choosing a well-known song.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="songTitle">Song Title *</Label>
        <Input
          id="songTitle"
          name="songTitle"
          required
          maxLength={200}
          placeholder="Name of the song"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bandName">Band / Artist Name (if applicable)</Label>
        <Input
          id="bandName"
          name="bandName"
          maxLength={200}
          placeholder="Original artist or band name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="videoUrl">Video URL *</Label>
        <Input
          id="videoUrl"
          name="videoUrl"
          required
          type="url"
          maxLength={500}
          placeholder="https://drive.google.com/..."
          aria-describedby="video-url-requirements"
        />
        <div
          id="video-url-requirements"
          className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-sm leading-6"
        >
          <p className="font-semibold text-foreground">
            A permanent, publicly accessible link is required
          </p>
          <p className="mt-1 text-muted-foreground">
            Upload your video to Google Drive, Dropbox, MEGA, or similar cloud
            storage, and enable access for anyone with the link. Temporary
            links such as WeTransfer or SwissTransfer are not accepted.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="coverPhoto">Cover Photo (vertical)</Label>
        <div className="flex items-center gap-4">
          {preview && (
            <Image
              src={preview}
              alt="Cover photo preview"
              width={80}
              height={120}
              className="h-30 w-20 rounded-lg object-cover"
            />
          )}
          <Input
            id="coverPhoto"
            name="coverPhoto"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="max-w-64"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Vertical image to announce the Instagram reel. Max 5 MB. PNG, JPEG, or WebP.
        </p>
        {fileError && <p className="text-sm text-destructive">{fileError}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="upcomingNews">Upcoming Shows, Releases & News</Label>
        <textarea
          id="upcomingNews"
          name="upcomingNews"
          rows={3}
          placeholder="Any upcoming shows, releases, or news you'd like us to mention…"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}

      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}
