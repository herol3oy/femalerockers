export const MAX_ADMIN_BATCH_SIZE = 100;
export const MAX_ADMIN_ATTEMPTS_PER_DAY = 500;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function isValidEmail(value: string): boolean {
  return value.length > 0 && value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value);
}

export type ParsedBulkEmail =
  | {
      input: string;
      email: string;
      status: "ready";
    }
  | {
      input: string;
      email: string;
      status: "duplicate" | "invalid";
      error: string;
    };

export function parseBulkEmails(raw: string): {
  entries: ParsedBulkEmail[];
  candidates: string[];
  inputCount: number;
} {
  const inputs = raw
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean);
  const seen = new Set<string>();
  const entries: ParsedBulkEmail[] = [];
  const candidates: string[] = [];

  for (const input of inputs) {
    const email = normalizeEmail(input);

    if (!isValidEmail(email)) {
      entries.push({
        input,
        email,
        status: "invalid",
        error: "Invalid email address",
      });
      continue;
    }

    if (seen.has(email)) {
      entries.push({
        input,
        email,
        status: "duplicate",
        error: "Duplicate in this batch",
      });
      continue;
    }

    seen.add(email);
    candidates.push(email);
    entries.push({ input, email, status: "ready" });
  }

  return { entries, candidates, inputCount: inputs.length };
}
