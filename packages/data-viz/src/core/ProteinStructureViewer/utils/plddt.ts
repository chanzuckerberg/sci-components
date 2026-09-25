import { ColorScale } from "../../../common/colorScales";
import { detectStructureFormat, type StructureFormat } from "./structureFormat";

/**
 * AlphaFold's pLDDT confidence bands. Thresholds are on the 0-1 scale that
 * `plddt` values use, ascending from lowest to highest confidence.
 */
export const PLDDT_COLOR_SCALE: ColorScale = {
  kind: "stepped",
  stops: [
    { color: "#FF7C45", label: "0.5", threshold: 0.5 },
    { color: "#FFDB11", label: "0.7", threshold: 0.7 },
    { color: "#64CBF3", label: "0.9", threshold: 0.9 },
    { color: "#0053D5", label: "1.0", threshold: 1 },
  ],
};

const PLDDT_BANDS =
  PLDDT_COLOR_SCALE.kind === "stepped" ? PLDDT_COLOR_SCALE.stops : [];

/**
 * The band colors alone, ascending from least to most confident.
 *
 * What the chain legend shows in place of a single color while pLDDT is
 * painting the structure: no one color stands for a chain then, so the swatch
 * carries the whole key instead.
 */
export const PLDDT_BAND_COLORS = PLDDT_BANDS.map((stop) => stop.color);

/**
 * Rewrites a PDB file's B-factor column with pLDDT scores so Mol* can read them
 * off the parsed model. B-factors occupy columns 60-66 of ATOM/HETATM lines;
 * scores arrive on a 0-1 scale and are stored on the conventional 0-100 one.
 * Residues past the end of `plddtValues` fall back to a mid-confidence 50.
 *
 * A residue is identified by chain, sequence number and insertion code. The
 * code has to be part of that: `10` and `10A` are two residues, Mol* counts
 * them as two, and treating them as one here would hand every residue after
 * them its neighbour's score.
 */
export function injectPlddtIntoPdb(
  pdbData: string,
  plddtValues: number[]
): string {
  const lines = pdbData.split("\n");
  let residueIndex = -1;
  let lastResidue = "";

  return lines
    .map((line) => {
      if (!line.startsWith("ATOM") && !line.startsWith("HETATM")) return line;

      // Chain id (22), sequence number (23-26) and insertion code (27).
      const residue = line.substring(21, 27);
      if (residue !== lastResidue) {
        residueIndex++;
        lastResidue = residue;
      }

      const plddt =
        residueIndex < plddtValues.length
          ? (plddtValues[residueIndex] ?? 0) * 100
          : 50;
      const bfactorStr = plddt.toFixed(2).padStart(6, " ");
      const paddedLine = line.padEnd(66, " ");

      return (
        paddedLine.substring(0, 60) + bfactorStr + paddedLine.substring(66)
      );
    })
    .join("\n");
}

const ATOM_SITE_PREFIX = "_atom_site.";
const B_FACTOR_COLUMN = "B_iso_or_equiv";

function skipCifWhitespace(line: string, index: number): number {
  let i = index;
  while (i < line.length && /\s/.test(line.charAt(i))) i += 1;
  return i;
}

function readCifToken(
  line: string,
  start: number
): { next: number; token: string } {
  const quote = line.charAt(start);
  if (quote === "'" || quote === '"') {
    const end = line.indexOf(quote, start + 1);
    if (end < 0) {
      return { next: line.length, token: line.slice(start + 1) };
    }
    return { next: end + 1, token: line.slice(start + 1, end) };
  }

  let i = start;
  while (i < line.length && !/\s/.test(line.charAt(i))) i += 1;
  return { next: i, token: line.slice(start, i) };
}

/**
 * Splits one CIF line into tokens, honouring `'quoted'` and `"quoted"` values.
 * Atom-site rows are one line each in practice; multiline `;text;` fields are
 * not used there and are not handled.
 */
function tokenizeCifLine(line: string): string[] {
  const tokens: string[] = [];
  let i = skipCifWhitespace(line, 0);

  while (i < line.length) {
    const { next, token } = readCifToken(line, i);
    tokens.push(token);
    i = skipCifWhitespace(line, next);
  }

  return tokens;
}

function isCifNull(value: string | undefined): boolean {
  return value === undefined || value === "." || value === "?";
}

function columnIndex(columns: string[], name: string): number {
  return columns.indexOf(name);
}

/**
 * Residue identity matching `injectPlddtIntoPdb`: chain + sequence number +
 * insertion code. Prefers the `auth_*` columns Mol* reports on the parsed
 * model, falling back to `label_*` when a file omitted them. `.` / `?`
 * insertion codes count as empty, the way a blank PDB column 27 does.
 */
function mmcifResidueKey(tokens: string[], columns: string[]): string {
  const authAsym = columnIndex(columns, "auth_asym_id");
  const labelAsym = columnIndex(columns, "label_asym_id");
  const authSeq = columnIndex(columns, "auth_seq_id");
  const labelSeq = columnIndex(columns, "label_seq_id");
  const ins = columnIndex(columns, "pdbx_PDB_ins_code");

  const chain =
    (authAsym >= 0 ? tokens[authAsym] : undefined) ??
    (labelAsym >= 0 ? tokens[labelAsym] : undefined) ??
    "";
  const seq =
    (authSeq >= 0 ? tokens[authSeq] : undefined) ??
    (labelSeq >= 0 ? tokens[labelSeq] : undefined) ??
    "";
  const insCode = isCifNull(ins >= 0 ? tokens[ins] : undefined)
    ? ""
    : (tokens[ins] as string);

  return `${chain}|${seq}|${insCode}`;
}

function isAtomSiteRow(tokens: string[], columns: string[]): boolean {
  const group = columnIndex(columns, "group_PDB");
  if (group < 0) return true;

  const value = tokens[group];
  return value === "ATOM" || value === "HETATM";
}

function plddtBFactor(residueIndex: number, plddtValues: number[]): string {
  const plddt =
    residueIndex < plddtValues.length
      ? (plddtValues[residueIndex] ?? 0) * 100
      : 50;
  return plddt.toFixed(2);
}

function isLoopStart(line: string): boolean {
  return line.trim() === "loop_" || line.trim().startsWith("loop_");
}

function isAtomSiteColumn(line: string): boolean {
  return line.trim().startsWith(ATOM_SITE_PREFIX);
}

function endsAtomSiteLoop(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed === "") return false;
  if (trimmed.startsWith("#")) return true;
  if (isLoopStart(trimmed)) return true;
  if (trimmed.startsWith("data_") || trimmed.startsWith("save_")) return true;
  // A new category written as key-value pairs, not as a loop.
  return trimmed.startsWith("_") && !trimmed.startsWith(ATOM_SITE_PREFIX);
}

function isAtomSiteLoop(lines: string[], loopIndex: number): boolean {
  let peek = loopIndex + 1;
  while (peek < lines.length && (lines[peek] as string).trim() === "") {
    peek += 1;
  }
  return peek < lines.length && isAtomSiteColumn(lines[peek] as string);
}

interface ResidueWalk {
  lastResidue: string;
  residueIndex: number;
}

function ensureBFactorColumn(columns: string[], headerLines: string[]): number {
  const existing = columnIndex(columns, B_FACTOR_COLUMN);
  if (existing >= 0) return existing;

  columns.push(B_FACTOR_COLUMN);
  headerLines.push(`${ATOM_SITE_PREFIX}${B_FACTOR_COLUMN}`);
  return columns.length - 1;
}

function rewriteAtomSiteRow(
  dataLine: string,
  columns: string[],
  bIndex: number,
  plddtValues: number[],
  walk: ResidueWalk
): string {
  if (dataLine.trim() === "") return dataLine;

  const tokens = tokenizeCifLine(dataLine);
  if (tokens.length === 0) return dataLine;

  // A row that arrived before the B-factor column was added is one token
  // short; pad so the new column has a slot to land in.
  while (tokens.length < columns.length) tokens.push(".");

  if (isAtomSiteRow(tokens, columns)) {
    const residue = mmcifResidueKey(tokens, columns);
    if (residue !== walk.lastResidue) {
      walk.residueIndex += 1;
      walk.lastResidue = residue;
    }
    tokens[bIndex] = plddtBFactor(walk.residueIndex, plddtValues);
  }

  return tokens.join(" ");
}

function rewriteAtomSiteLoop(
  lines: string[],
  loopIndex: number,
  plddtValues: number[],
  walk: ResidueWalk
): { next: number; rows: string[] } {
  const rows: string[] = [lines[loopIndex] as string];
  let i = loopIndex + 1;
  const columns: string[] = [];

  while (i < lines.length && isAtomSiteColumn(lines[i] as string)) {
    columns.push((lines[i] as string).trim().slice(ATOM_SITE_PREFIX.length));
    rows.push(lines[i] as string);
    i += 1;
  }

  const bIndex = ensureBFactorColumn(columns, rows);

  while (i < lines.length && !endsAtomSiteLoop(lines[i] as string)) {
    rows.push(
      rewriteAtomSiteRow(lines[i] as string, columns, bIndex, plddtValues, walk)
    );
    i += 1;
  }

  return { next: i, rows };
}

/**
 * Rewrites an mmCIF (PDBx) file's `_atom_site.B_iso_or_equiv` column with
 * pLDDT scores so Mol* can read them off the parsed model, the same way
 * `injectPlddtIntoPdb` rewrites the PDB B-factor column. Scores arrive on a
 * 0-1 scale and are stored on the conventional 0-100 one. Residues past the
 * end of `plddtValues` fall back to a mid-confidence 50.
 *
 * If the file has no B-factor column, one is appended to the atom-site loop
 * rather than leaving the scores behind.
 */
export function injectPlddtIntoMmcif(
  mmcifData: string,
  plddtValues: number[]
): string {
  const lines = mmcifData.split("\n");
  const result: string[] = [];
  const walk: ResidueWalk = { lastResidue: "", residueIndex: -1 };
  let i = 0;
  let rewrittenLoop = false;

  while (i < lines.length) {
    const line = lines[i] as string;

    if (!rewrittenLoop && isLoopStart(line) && isAtomSiteLoop(lines, i)) {
      const rewritten = rewriteAtomSiteLoop(lines, i, plddtValues, walk);
      result.push(...rewritten.rows);
      i = rewritten.next;
      rewrittenLoop = true;
      continue;
    }

    result.push(line);
    i += 1;
  }

  return result.join("\n");
}

/**
 * Rewrites a structure file's B-factors with pLDDT scores. Dispatches to
 * `injectPlddtIntoPdb` or `injectPlddtIntoMmcif` from `format`, or from
 * detecting the format of `data` when `format` is omitted.
 */
export function injectPlddt(
  data: string,
  plddtValues: number[],
  format: StructureFormat = detectStructureFormat(data)
): string {
  return format === "mmcif"
    ? injectPlddtIntoMmcif(data, plddtValues)
    : injectPlddtIntoPdb(data, plddtValues);
}
