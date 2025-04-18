import { expect, test } from "vitest";

import { ProjectedLineLayer } from "@";

test("construct line layer with 3D lines", () => {
  const layer = new ProjectedLineLayer([
    {
      path: [
        [0, 0, 0],
        [1, 1, 1],
      ],
      color: [1, 0, 0],
      width: 1,
    },
    {
      path: [
        [0, 0, 0],
        [1, 1, 1],
      ],
      color: [1, 0, 0],
      width: 1,
    },
  ]);
  expect(layer.objects.length).toBe(2);
});
