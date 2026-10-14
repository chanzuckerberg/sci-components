/**
 * Reads the props tables that the component documentation is authored with.
 *
 * Each component's `__storybook__/docs/content.html` carries hand-written
 * tables of `Name | Type | Default | Description`. They are the only source of
 * prop descriptions and defaults in the repo, so the generated props data
 * borrows from them to fill in what `react-docgen-typescript` cannot infer.
 *
 * `node-html-parser` is used rather than jsdom because this package compiles
 * without the DOM lib, being a Node-only server.
 */
import * as fs from "fs";
import { HTMLElement, parse } from "node-html-parser";

/** The header row shared by every authored props table. */
const PROPS_TABLE_HEADER = "Name|Type|Default|Description";

/** Cell contents the authors use to mean "nothing to say here". */
const EMPTY_CELLS = new Set(["", "-", "--", "N/A", "n/a", "—"]);

export interface PropsTableEntry {
  defaultValue?: string;
  description?: string;
  type?: string;
}

export type PropsTable = Map<string, PropsTableEntry>;

function rowCells(row: HTMLElement): string[] {
  return row
    .querySelectorAll("td, th")
    .map((cell) => cell.textContent.replace(/\s+/g, " ").trim());
}

function meaningful(value = ""): string | undefined {
  return EMPTY_CELLS.has(value) ? undefined : value;
}

/**
 * Tables are recognized by their header rather than their heading: headings
 * range from "Dialog Props" to "Content" to "LegendItemData", while the header
 * row is identical across all of them.
 *
 * A page may hold several props tables, and secondary ones often describe a
 * nested data shape rather than the component's own props. Where a name shows
 * up in more than one table the rows genuinely disagree, so those names are
 * dropped rather than guessed at.
 */
export function readPropsTable(contentHtmlPath: string): PropsTable {
  const entries: PropsTable = new Map();

  if (!fs.existsSync(contentHtmlPath)) {
    return entries;
  }

  const root = parse(fs.readFileSync(contentHtmlPath, "utf-8"));
  const ambiguous = new Set<string>();

  for (const table of root.querySelectorAll("table")) {
    const rows = table.querySelectorAll("tr");

    if (!rows[0] || rowCells(rows[0]).join("|") !== PROPS_TABLE_HEADER) {
      continue;
    }

    for (const row of rows.slice(1)) {
      const [name, type, defaultValue, description] = rowCells(row);

      if (!name) {
        continue;
      }

      if (entries.has(name)) {
        ambiguous.add(name);
        continue;
      }

      entries.set(name, {
        defaultValue: meaningful(defaultValue),
        description: meaningful(description),
        type: meaningful(type),
      });
    }
  }

  for (const name of ambiguous) {
    entries.delete(name);
  }

  return entries;
}
