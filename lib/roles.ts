import type { UserRole } from "@/app/db/schema";

export type RoleFieldId =
  | "artistName"
  | "cityCountry"
  | "mainInstrument"
  | "genre"
  | "bio"
  | "instagramUrl"
  | "videoLink"
  | "collabStatus";

export type RoleFieldConfig = {
  id: RoleFieldId;
  type: "text" | "textarea" | "checkbox" | "combobox";
  label: string;
  placeholder?: string;
  required?: boolean;
};

export type RoleConfig = {
  id: UserRole;
  label: string;
  description: string;
  fields: RoleFieldConfig[];
};

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  musician: {
    id: "musician",
    label: "Musician",
    description: "I am a solo musician or instrumentalist",
    fields: [
      {
        id: "artistName",
        type: "text",
        label: "Artist Name",
        placeholder: "e.g. Jane Doe",
        required: true,
      },
      {
        id: "cityCountry",
        type: "combobox",
        label: "City / Country",
        placeholder: "e.g. Austin, USA",
      },
      {
        id: "mainInstrument",
        type: "text",
        label: "Main Instrument",
        placeholder: "e.g. Guitar, Drums, Vocals",
      },
      {
        id: "genre",
        type: "text",
        label: "Genre",
        placeholder: "e.g. Rock, Jazz, Pop",
      },
      {
        id: "bio",
        type: "textarea",
        label: "Bio",
        placeholder: "Tell us about yourself as a musician…",
      },
      {
        id: "instagramUrl",
        type: "text",
        label: "Instagram URL",
        placeholder: "https://instagram.com/yourhandle",
      },
      {
        id: "videoLink",
        type: "text",
        label: "Video Link",
        placeholder: "https://youtube.com/watch?v=…",
      },
      {
        id: "collabStatus",
        type: "checkbox",
        label: "Open to collaborate",
      },
    ],
  },
  band: {
    id: "band",
    label: "Band",
    description: "I represent a band or group",
    fields: [
      {
        id: "artistName",
        type: "text",
        label: "Band Name",
        placeholder: "e.g. The Rockets",
        required: true,
      },
      {
        id: "cityCountry",
        type: "combobox",
        label: "City / Country",
        placeholder: "e.g. London, UK",
      },
      {
        id: "genre",
        type: "text",
        label: "Genre",
        placeholder: "e.g. Rock, Jazz, Pop",
      },
      {
        id: "bio",
        type: "textarea",
        label: "Bio",
        placeholder: "Tell us about your band…",
      },
      {
        id: "instagramUrl",
        type: "text",
        label: "Instagram URL",
        placeholder: "https://instagram.com/yourband",
      },
      {
        id: "videoLink",
        type: "text",
        label: "Video Link",
        placeholder: "https://youtube.com/watch?v=…",
      },
      {
        id: "collabStatus",
        type: "checkbox",
        label: "Open to collaborate",
      },
    ],
  },
  agent: {
    id: "agent",
    label: "Agent",
    description: "I am a talent agent, manager, or industry professional",
    fields: [
      {
        id: "artistName",
        type: "text",
        label: "Full Name / Agency",
        placeholder: "e.g. Jane Doe Agency",
        required: true,
      },
      {
        id: "cityCountry",
        type: "combobox",
        label: "City / Country",
        placeholder: "e.g. Nashville, USA",
      },
      {
        id: "bio",
        type: "textarea",
        label: "Bio",
        placeholder: "Tell us about your work as an agent…",
      },
      {
        id: "instagramUrl",
        type: "text",
        label: "Instagram URL",
        placeholder: "https://instagram.com/youragency",
      },
    ],
  },
  music_fan: {
    id: "music_fan",
    label: "Music Fan",
    description: "I am a fan who wants to support and follow musicians",
    fields: [
      {
        id: "artistName",
        type: "text",
        label: "Display Name",
        placeholder: "e.g. Jane Doe",
        required: true,
      },
      {
        id: "bio",
        type: "textarea",
        label: "Bio",
        placeholder: "Tell us about your music taste…",
      },
    ],
  },
};

export function getRoleLabel(role: string): string {
  const config = Object.values(ROLE_CONFIGS).find((r) => r.id === role);
  return config?.label ?? role;
}
