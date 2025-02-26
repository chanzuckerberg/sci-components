import { expect, test } from "vitest";

import { WebGLRenderer } from "@";

test("Instantiate WebGLRenderer", () => {
  document.body.innerHTML = '<canvas id="canvas"></canvas>';
  const renderer = new WebGLRenderer("#canvas");
  expect(renderer).toBeDefined();
});

test("Instantiate WebGLRenderer with invalid selector", () => {
  document.body.innerHTML = "";
  expect(() => new WebGLRenderer("#canvas")).toThrowError();
});

test("Instantiate WebGLRenderer with no WebGL context", () => {
  document.body.innerHTML = '<canvas id="canvas"></canvas>';
  const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
  canvas.getContext = () => null;
  expect(() => new WebGLRenderer("#canvas")).toThrowError();
});
