"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/prompts";

import { useRouter } from "next/navigation";

export default function Home() {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSimplify = async () => {
    if (!category) return;
    setLoading(true);
    try {
      const response = await fetch("/api/simplify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, input }),
      });
      if (!response.ok) throw new Error("Failed to simplify text");
      const data = await response.json();

      localStorage.setItem("sections", JSON.stringify(data.sections || []));
      router.push("/results");
      setInput("");
    } catch {
      localStorage.setItem(
        "sections",
        JSON.stringify([
          {
            title: "Error",
            content: "Could not simplify text. Try again.",
            group: "",
            highlight: "red", // pale red
          },
        ])
      );
      router.push("/results");
      setInput("");
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-3xl font-bold mb-6">Just-Say-It-AI</h1>

      <Select value={category} onValueChange={setCategory} disabled={loading}>
        <SelectTrigger className="mb-4 w-full max-w-xs">
          <SelectValue placeholder="Select T&Cs Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(categories).map(([value, { label }]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Paste your Terms & Conditions here..."
        rows={10}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full max-w-2xl mb-4 max-h-48 overflow-y-auto"
      />

      <Button
        onClick={handleSimplify}
        disabled={loading || !input || !category}
        className="mb-4 cursor-pointer"
      >
        {loading ? "Simplifying..." : "Simplify"}
      </Button>
    </main>
  );
}
