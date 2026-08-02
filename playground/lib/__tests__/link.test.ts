import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { compressCode, decompressCode } from "../compress";
import {
  PLAYGROUND_META_ID,
  PLAYGROUND_STORY_ID,
  buildPlaygroundHref,
  readCodeFromHash,
} from "../link";

const SOURCE = `import { Button } from "@czi-sds/components";

function App() {
  return <Button sdsStyle="square" sdsType="primary">Click me</Button>;
}

export default App;
`;

/**
 * A payload in the format the Astryx playground publishes: raw deflate in
 * base64url, produced by an implementation other than fflate. It is pinned here
 * because the encoding is the one part of the playground the outside world can
 * hold us to — a link shared today has to keep opening tomorrow — and a
 * round-trip test on its own would pass for any two functions that agree.
 */
const FOREIGN_PAYLOAD =
  "JctNCoMwEAbQfU7xkY3tygNYSymUnmNqJiWQHxknEhHvXqj790Kaiyj2Z1Ut-YCXktA9" +
  "aFHZmuMlfHM_FeH-BN1gDLd_ceypRoWvedJQMl6N0hz5csVuAGGtknE7HyJ9OI72zYpF" +
  "SZSdxUoSKOtoZwmJZLPo74M5zA8";

/**
 * The longest of the real documentation examples, which is what the button in
 * the docs hands to {@link buildPlaygroundHref}. Whether one of these survives
 * the trip intact, and stays short enough to be a usable link, is the whole
 * point of the encoding — a synthetic snippet is too small to tell us either.
 */
const EXAMPLE_SOURCE = readFileSync(
  resolve(
    process.cwd(),
    "packages/components/src/core/PreComposedTable/__storybook__/docs/examples/PreComposedTableWithTableActions.tsx"
  ),
  "utf-8"
);

describe("compressCode", () => {
  it("round-trips source through the URL encoding", () => {
    expect(decompressCode(compressCode(SOURCE))).toBe(SOURCE);
  });

  it("produces a payload safe to drop into a URL unescaped", () => {
    expect(compressCode(SOURCE)).toMatch(/^[\w-]+$/);
  });

  it("round-trips a real documentation example", () => {
    expect(decompressCode(compressCode(EXAMPLE_SOURCE))).toBe(EXAMPLE_SOURCE);
  });

  it("keeps the longest example short enough to be a usable link", () => {
    // Deflate has to earn back base64's third, and on the worst case in the
    // docs it does: the link lands well inside what every browser accepts.
    expect(buildPlaygroundHref(EXAMPLE_SOURCE).length).toBeLessThan(8000);
    expect(compressCode(EXAMPLE_SOURCE).length).toBeLessThan(
      EXAMPLE_SOURCE.length / 2
    );
  });

  it("reads a payload written by another implementation of the format", () => {
    expect(decompressCode(FOREIGN_PAYLOAD)).toContain(
      "export default function Example()"
    );
  });

  it("returns null for a fragment that is not a payload", () => {
    expect(decompressCode("not-a-payload")).toBeNull();
  });
});

describe("buildPlaygroundHref", () => {
  it("addresses the playground story on the preview document", () => {
    const url = new URL(buildPlaygroundHref(SOURCE));

    expect(url.pathname.endsWith("/iframe.html")).toBe(true);
    expect(url.searchParams.get("id")).toBe(PLAYGROUND_STORY_ID);
    expect(url.searchParams.get("viewMode")).toBe("story");
  });

  it("carries the source in the fragment, where it stays on the client", () => {
    const { hash, search } = new URL(buildPlaygroundHref(SOURCE));

    expect(search).not.toContain("code=");
    expect(readCodeFromHash(hash)).toBe(SOURCE);
  });
});

describe("PLAYGROUND_META_ID", () => {
  it("matches the id the story is registered under", () => {
    // Storybook indexes stories by parsing them, so the story file has to spell
    // its id out rather than import this one. Nothing else would notice them
    // drifting apart until every link in the docs led to a missing story.
    const story = readFileSync(
      resolve(process.cwd(), "playground/index.stories.tsx"),
      "utf-8"
    );

    expect(story).toContain(`id: "${PLAYGROUND_META_ID}",`);
  });
});

describe("readCodeFromHash", () => {
  it("has nothing to report for a bare visit", () => {
    expect(readCodeFromHash("")).toBeNull();
  });

  it("finds the code alongside other fragment parameters", () => {
    const payload = compressCode(SOURCE);

    expect(readCodeFromHash(`#theme=dark&code=${payload}`)).toBe(SOURCE);
  });
});
