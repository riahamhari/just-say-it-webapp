import { Button } from "@/components/ui/button";
import { Section } from "@/types/section";

type Props = {
  sections: Section[];
  active: string;
  onFilter: (group: string) => void;
};

const FilterBar = ({ sections, active, onFilter }: Props) => {
  const groups = ["All", ...new Set(sections.map((s) => s.group))];

  return (
    <nav aria-label="Section filters" className="flex gap-2 mb-4 flex-wrap">
      {groups.map((group) => (
        <Button
          key={group}
          onClick={() => onFilter(group)}
          variant={active === group ? "default" : "secondary"}
        >
          {group}
        </Button>
      ))}
    </nav>
  );
};

export default FilterBar;
