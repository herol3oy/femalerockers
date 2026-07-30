import type { Metadata } from "next";
import "./globals.css";
import { Roboto, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/footer";
import { NavigationBar } from "@/components/navigation-bar";
import { cn } from "@/lib/utils";

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Female Rockers",
  description:
    "A strong, elegant place where female musicians create a public profile and get discovered.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full antialiased",
        "font-sans",
        roboto.variable,
        spaceGroteskHeading.variable,
      )}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NavigationBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
