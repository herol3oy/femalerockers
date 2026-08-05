"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormState =
  | { status: "idle"; message?: never }
  | { status: "submitting"; message?: never }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export default function ContactPage() {
  const fullNameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [state, setState] = useState<FormState>({ status: "idle" });

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const form = event.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!fullName || !email || !message) {
      setState({ status: "error", message: "Please fill in all fields." });
      return;
    }

    data.append("access_key", "351a7dd5-6cc9-4295-be55-0c0ce89d26f2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = (await response.json()) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !json.success) {
        setState({
          status: "error",
          message: json.message || "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Success! We’ll get back to you soon.",
      });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14 sm:px-8 sm:py-20">
      <header className="space-y-4">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          Send us a message. We read every note.
        </p>
        <p className="text-sm text-muted-foreground">
          Prefer email? Reach us at{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
            href="mailto:contact@femalerockers.com"
          >
            contact@femalerockers.com
          </a>
          .
        </p>
      </header>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <div className="grid gap-2">
          <Label htmlFor={fullNameId}>
            Full name <span className="text-destructive">*</span>
          </Label>
          <Input
            id={fullNameId}
            name="name"
            autoComplete="name"
            placeholder="Your name"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={emailId}>
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={messageId}>
            Message <span className="text-destructive">*</span>
          </Label>
          <textarea
            id={messageId}
            name="message"
            placeholder="Your message"
            required
            rows={6}
            className="min-h-[140px] w-full resize-y rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          We use the information you provide to respond to your message. Learn
          more in our{" "}
          <Link
            href="/privacy"
            className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" disabled={state.status === "submitting"}>
            {state.status === "submitting" ? "Sending…" : "Send message"}
          </Button>

          {state.status === "error" ? (
            <p className="text-sm text-destructive">{state.message}</p>
          ) : state.status === "success" ? (
            <Card className="w-full sm:w-auto border-emerald-500/30 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20">
              <CardContent className="px-4 py-2">
                <p className="text-sm font-medium">{state.message}</p>
              </CardContent>
            </Card>
          ) : (
            <p className="text-sm text-muted-foreground">
              Fields marked <span className="text-destructive">*</span> are
              required.
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
