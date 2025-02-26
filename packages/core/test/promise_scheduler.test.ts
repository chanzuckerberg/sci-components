import { AbortError, PromiseScheduler } from "@/data/promise_scheduler";
import { expect, test } from "vitest";

test("submit one promise", async () => {
  const executor = new PromiseScheduler(1);
  let blocked = true;
  const promise = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return 0;
  });
  expect(executor.numPending).toEqual(0);
  expect(executor.numRunning).toEqual(1);
  blocked = false;
  await expect(promise).resolves.toEqual(0);
  expect(executor.numRunning).toEqual(0);
  expect(executor.numPending).toEqual(0);
});

test("submit two concurrent promises", async () => {
  const executor = new PromiseScheduler(2);
  let blocked = true;
  const promise0 = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return 0;
  });
  const promise1 = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return 1;
  });
  expect(executor.numPending).toEqual(0);
  expect(executor.numRunning).toEqual(2);
  blocked = false;
  await expect(promise0).resolves.toEqual(0);
  await expect(promise1).resolves.toEqual(1);
  expect(executor.numRunning).toEqual(0);
  expect(executor.numPending).toEqual(0);
});

test("submit one pending promise", async () => {
  const executor = new PromiseScheduler(1);
  let blocked = true;
  const promise0 = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return 0;
  });
  const promise1 = executor.submit(async () => {
    return 1;
  });
  expect(executor.numPending).toEqual(1);
  expect(executor.numRunning).toEqual(1);
  blocked = false;
  await expect(promise0).resolves.toEqual(0);
  await expect(promise1).resolves.toEqual(1);
  expect(executor.numRunning).toEqual(0);
  expect(executor.numPending).toEqual(0);
});

test("cancel one pending promise", async () => {
  const executor = new PromiseScheduler(1);
  let blocked = true;
  const promise0 = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    return 0;
  });
  const promise1 = executor.submit(async () => {
    return 1;
  });
  expect(executor.numPending).toEqual(1);
  expect(executor.numRunning).toEqual(1);
  executor.shutdown();
  blocked = false;
  await expect(promise0).resolves.toEqual(0);
  await expect(promise1).rejects.toThrow(new AbortError("shutdown"));
  expect(executor.numRunning).toEqual(0);
  expect(executor.numPending).toEqual(0);
});

test("submit one promise after shutdown", async () => {
  const executor = new PromiseScheduler(1);
  executor.shutdown();
  await expect(executor.submit(async () => 1)).rejects.toThrow(
    new AbortError("shutdown")
  );
  expect(executor.numPending).toEqual(0);
  expect(executor.numRunning).toEqual(0);
});

test("submit one promise that throws", async () => {
  const executor = new PromiseScheduler(1);
  let blocked = true;
  const promise = executor.submit(async () => {
    while (blocked) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    throw "test";
  });
  expect(executor.numRunning).toEqual(1);
  expect(executor.numPending).toEqual(0);
  blocked = false;
  await expect(promise).rejects.toThrow("test");
  expect(executor.numRunning).toEqual(0);
  expect(executor.numPending).toEqual(0);
});
