import { expect, test, vi } from "vitest";

import { Layer } from "@";

class TestLayer extends Layer {
  public update() {}

  public setStateReady() {
    this.setState("ready");
  }
}

test("Default layer state is 'initialized'", () => {
  const layer = new TestLayer();

  expect(layer.state).toBe("initialized");
});

test("Add state change callback", () => {
  const layer = new TestLayer();
  const callback = vi.fn();
  layer.addStateChangeCallback(callback);
  layer.setStateReady();

  expect(callback).toHaveBeenCalledWith("ready", "initialized");
});

test("Remove state change callback", () => {
  const layer = new TestLayer();
  const callback = vi.fn();
  layer.addStateChangeCallback(callback);
  layer.removeStateChangeCallback(callback);
  layer.setStateReady();

  expect(callback).toHaveBeenCalledTimes(0);
});
