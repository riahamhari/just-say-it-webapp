"use client";
import React, { useEffect, useState } from "react";
import { SummaryCards } from "@/components/global/SummaryCards/SummaryCards";
import { Section } from "@/types/section";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Results = () => {
  const [sections, setSections] = useState<Section[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    const saved = localStorage.getItem("sections");
    if (saved) {
      setSections(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    if (sections) {
      localStorage.setItem("sections", JSON.stringify(sections));
    }
  }, [sections]);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full px-4">
      <h1 className="text-3xl font-bold mb-6">Just-Say-It-AI</h1>
      {sections && <SummaryCards sections={sections} />}
      <Button
        onClick={() => {
          localStorage.removeItem("sections");
          router.push("/");
        }}
      >
        Simplify Again
      </Button>
    </main>
  );
};

export default Results;
