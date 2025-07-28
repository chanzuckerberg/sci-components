import { DropdownItem } from "./components/NavigationHeaderPrimaryNav";

// Helper function to group dropdown items by section
export function groupItemsBySection(
  items: DropdownItem[]
): Record<string, DropdownItem[]> {
  return items.reduce(
    (groups, item) => {
      const section = item.section || "";
      return {
        ...groups,
        [section]: [...(groups[section] || []), item],
      };
    },
    {} as Record<string, DropdownItem[]>
  );
}
