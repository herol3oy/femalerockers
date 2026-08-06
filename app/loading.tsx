import Image from "next/image";

export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border/50 bg-background/80 p-3 shadow-sm backdrop-blur-sm">
          <Image
            src="/female-rockers-logo.svg"
            alt="Female Rockers logo"
            width={64}
            height={64}
            className="h-14 w-14 animate-[spin_1.2s_linear_infinite]"
          />
        </div>
        <p className="text-sm font-medium text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
