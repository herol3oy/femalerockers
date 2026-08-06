"use client";

import { CheckIcon, MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Popover } from "radix-ui";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type MultiSelectComboboxProps = {
  id?: string;
  name?: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string | null;
  value?: string[];
  onChange?: (value: string[]) => void;
  maxSelections?: number;
  emptyText?: string;
  required?: boolean;
};

function parseDefaultValue(value: string | null | undefined) {
  if (!value) return [];

  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  );
}

export function MultiSelectCombobox({
  id,
  name = "values",
  options,
  placeholder = "Search...",
  defaultValue,
  value,
  onChange,
  maxSelections = 5,
  emptyText = "No options found.",
  required,
}: MultiSelectComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [selectedValues, setSelectedValues] = useState<string[]>(() =>
    parseDefaultValue(defaultValue),
  );
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (Array.isArray(value)) {
      setSelectedValues(Array.from(new Set(value)));
    }
  }, [value]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return options.filter((option) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        option.toLowerCase().includes(normalizedQuery);
      const isSelected = selectedValues.includes(option);

      return matchesQuery && !isSelected;
    });
  }, [options, query, selectedValues]);

  const handleSelect = (option: string) => {
    if (selectedValues.includes(option)) {
      return;
    }

    if (selectedValues.length >= maxSelections) {
      setError(`Select up to ${maxSelections} options.`);
      return;
    }

    const nextValues = Array.from(new Set([...selectedValues, option]));
    setSelectedValues(nextValues);
    setError(null);
    setQuery("");
    setActiveIndex(0);
    onChange?.(nextValues);
    inputRef.current?.focus();
  };

  const handleRemove = (option: string) => {
    const nextValues = selectedValues.filter((value) => value !== option);
    setSelectedValues(nextValues);
    setError(null);
    onChange?.(nextValues);
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        Math.min(prev + 1, Math.max(filteredOptions.length - 1, 0)),
      );
      setOpen(true);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
      setOpen(true);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const option = filteredOptions[activeIndex];
      if (option) {
        handleSelect(option);
      }
      return;
    }

    if (event.key === "Backspace" && query.length === 0 && selectedValues.length > 0) {
      event.preventDefault();
      handleRemove(selectedValues[selectedValues.length - 1]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div className="relative">
            <div
              className={cn(
                "flex min-h-10 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                error && "border-destructive",
              )}
            >
              {selectedValues.map((value) => (
                <Badge key={value} variant="secondary" className="gap-1">
                  <span>{value}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${value}`}
                    className="rounded-full outline-none transition-colors hover:bg-muted-foreground/20"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleRemove(value)}
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <MagnifyingGlassIcon className="size-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  id={inputId}
                  type="text"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                    setOpen(true);
                    setError(null);
                  }}
                  onFocus={() => setOpen(true)}
                  onKeyDown={handleKeyDown}
                  placeholder={selectedValues.length > 0 ? "" : placeholder}
                  className="flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
                  role="combobox"
                  aria-expanded={open}
                  aria-controls={`${inputId}-options`}
                  aria-autocomplete="list"
                  autoComplete="off"
                  required={required}
                />
              </div>
            </div>
            <input type="hidden" name={name} value={selectedValues.join(",")} />
          </div>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-50 max-h-64 min-w-[16rem] overflow-auto rounded-md border bg-popover p-1 shadow-md"
            onOpenAutoFocus={(event) => event.preventDefault()}
          >
            <div id={`${inputId}-options`} role="listbox">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
                      index === activeIndex
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(option)}
                  >
                    <span>{option}</span>
                    <CheckIcon className="size-4 opacity-0" />
                  </button>
                ))
              ) : (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {emptyText}
                </div>
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {error ? (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      ) : (
        <p className="mt-1 text-xs text-muted-foreground">
          Select up to {maxSelections} options.
        </p>
      )}
    </div>
  );
}
