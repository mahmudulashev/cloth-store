"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { SearchIcon } from "@/components/icons";

export function SearchField({
  className = "",
  placeholder = "What are you looking for?",
}: {
  className?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = query.trim();
        router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products");
      }}
      className={`flex h-[50px] items-center gap-3 rounded-full border border-ink/15 pr-[29px] pl-4 transition-colors duration-300 focus-within:border-ink ${className}`}
    >
      <SearchIcon className="shrink-0 text-ink" />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-full min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink-40"
      />
      <button
        type="submit"
        className="-my-3 shrink-0 py-3 text-[14px] leading-[18px] transition-opacity hover:opacity-60"
      >
        Search
      </button>
    </form>
  );
}
