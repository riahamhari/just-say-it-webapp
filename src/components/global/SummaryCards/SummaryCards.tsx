import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  FileText,
} from "lucide-react";
import { ReactNode, useState } from "react";
import FilterBar from "../FilterBar/FilterBar";
import { Section } from "@/types/section";

type Props = {
  sections: Section[];
};

const highlightClasses: Record<Section["highlight"], string> = {
  red: "bg-red-100 border-red-200",
  yellow: "bg-yellow-100 border-yellow-200",
  green: "bg-green-100 border-green-200",
  blue: "bg-blue-100 border-blue-200",
  gray: "bg-gray-100 border-gray-200",
};

const highlightIcons: Record<Section["highlight"], ReactNode> = {
  red: <XCircle className="w-4 h-4 text-red-600" />,
  yellow: <AlertTriangle className="w-4 h-4 text-yellow-600" />,
  green: <CheckCircle className="w-4 h-4 text-green-600" />,
  blue: <Info className="w-4 h-4 text-blue-600" />,
  gray: <FileText className="w-4 h-4 text-gray-600" />,
};

export const SummaryCards = ({ sections }: Props) => {
  const [activeFilter, setActiveFilter] = useState("All");

  // filter sections based on active filter
  const filtered =
    activeFilter === "All"
      ? sections
      : sections.filter((s) => s.group === activeFilter);

  return (
    <>
      <FilterBar
        sections={sections}
        onFilter={setActiveFilter}
        active={activeFilter}
      />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 max-w-3xl mb-4">
        {filtered.map((section) => (
          <div
            key={section.title}
            className={`rounded-xl p-4 shadow border ${
              highlightClasses[section.highlight]
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {highlightIcons[section.highlight]}
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
