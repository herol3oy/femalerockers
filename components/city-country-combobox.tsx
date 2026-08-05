"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { Popover } from "radix-ui";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { searchCities } from "@/lib/location-action";
import { cn } from "@/lib/utils";

type Props = {
  name?: string;
  defaultValue?: string | null;
  placeholder?: string;
  required?: boolean;
};

export function CityCountryCombobox({
  name = "cityCountry",
  defaultValue,
  placeholder = "Search city...",
  required,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(defaultValue ?? "");
  const [selected, setSelected] = useState(defaultValue ?? "");
  const [results, setResults] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    setSelected("");
    setActiveIndex(-1);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const matches = await searchCities(value);
        setResults(matches);
        setOpen(matches.length > 0);
      });
    }, 300);
  }, []);

  const handleSelect = useCallback((value: string) => {
    setSelected(value);
    setQuery(value);
    setOpen(false);
    setResults([]);
    setActiveIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(results[activeIndex]);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [activeIndex, results, handleSelect],
  );

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div className="relative">
        <Popover.Anchor asChild>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (results.length > 0) setOpen(true);
              }}
              placeholder={placeholder}
              className="flex w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              autoComplete="off"
              role="combobox"
              aria-expanded={open}
              aria-haspopup="listbox"
              aria-autocomplete="list"
            />
            {isPending && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 size-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
            )}
          </div>
        </Popover.Anchor>
        <input type="hidden" name={name} value={selected} required={required} />
      </div>
      <Popover.Portal>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          className="z-50 w-(--radix-popover-trigger-width) max-h-60 overflow-auto rounded-md border bg-popover p-1 shadow-md"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div ref={listRef} role="listbox">
            {results.map((result, index) => (
              <button
                key={result}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                className={cn(
                  "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                  index === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(result)}
              >
                {result}
              </button>
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
