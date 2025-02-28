import { mat4, vec3, quat } from "gl-matrix";

import { expect, test, vi } from "vitest";

import { AffineTransform } from "@/core/transforms";

// NOTES:
// * mat4 is column-major
// * use mat4.equals instead of expect(t.matrix).toEqual because it's better for comparing floats,
// even though it provides worse output on failure

const expectMatrixEquals = (a: mat4, b: mat4) => {
  expect(mat4.equals(a, b)).toBe(true);
};

test("rotate", () => {
  const t = new AffineTransform();
  const q = quat.rotateZ(quat.create(), quat.create(), Math.PI / 2);
  t.rotate(q);
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 0, 1, 0, 0,
     -1, 0, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1 ]
  );
  t.rotate(quat.invert(quat.create(), q));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1 ]
  );
});

test("translate", () => {
  const t = new AffineTransform();
  const t0 = vec3.fromValues(1, 2, 3);
  t.translate(t0);
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1, 2, 3, 1 ]
  );
  t.translate(t0);
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      2, 4, 6, 1 ]
  );
});

test("scale", () => {
  const t = new AffineTransform();
  t.scale(vec3.fromValues(2, 3, 4));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 2, 0, 0, 0,
      0, 3, 0, 0,
      0, 0, 4, 0,
      0, 0, 0, 1 ]
  );
  t.scale(vec3.fromValues(2, 3, 4));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 4, 0, 0, 0,
      0, 9, 0, 0,
      0, 0, 16, 0,
      0, 0, 0, 1 ]
  );
});

test("scale then translate", () => {
  const t = new AffineTransform();
  t.scale(vec3.fromValues(2, 3, 4));
  t.translate(vec3.fromValues(1, 2, 3));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 2, 0, 0, 0,
      0, 3, 0, 0,
      0, 0, 4, 0,
      1, 2, 3, 1 ]
  );
});

test("translate then scale", () => {
  const t = new AffineTransform();
  t.translate(vec3.fromValues(1, 2, 3));
  t.scale(vec3.fromValues(2, 3, 4));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 2, 0, 0, 0,
      0, 3, 0, 0,
      0, 0, 4, 0,
      2, 6, 12, 1 ]
  );
});

test("rotate then translate", () => {
  const t = new AffineTransform();
  const q = quat.rotateZ(quat.create(), quat.create(), Math.PI / 2);
  t.rotate(q);
  t.translate(vec3.fromValues(1, 2, 3));
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 0, 1, 0, 0,
     -1, 0, 0, 0,
      0, 0, 1, 0,
      1, 2, 3, 1 ]
  );
});

test("translate then rotate", () => {
  const t = new AffineTransform();
  t.translate(vec3.fromValues(1, 2, 3));
  const q = quat.rotateZ(quat.create(), quat.create(), Math.PI / 2);
  t.rotate(q);
  // prettier-ignore
  expectMatrixEquals(
    t.matrix,
    [ 0, 1, 0, 0,
     -1, 0, 0, 0,
      0, 0, 1, 0,
     -2, 1, 3, 1 ]
  );
});

test("inverse", () => {
  // use two transforms to check inverse is correct without first accessing the matrix
  const t0 = new AffineTransform();
  const t1 = new AffineTransform();
  const rotation = quat.rotateZ(quat.create(), quat.create(), Math.PI / 2);
  const translation = vec3.fromValues(1, 2, 3);
  const scale = vec3.fromValues(2, 3, 4);
  t0.rotate(rotation);
  t0.translate(translation);
  t0.scale(scale);
  t1.rotate(rotation);
  t1.translate(translation);
  t1.scale(scale);
  expectMatrixEquals(t0.inverse, mat4.invert(mat4.create(), t1.matrix));
});

test("matrix is cached on repeat access", () => {
  const t = new AffineTransform();
  // @ts-expect-error TS2345 - spying on private method
  const computeSpy = vi.spyOn(t, "computeMatrix");
  t.translate(vec3.fromValues(1, 2, 3));
  expect(t.matrix).toBe(t.matrix);
  expect(computeSpy).toHaveBeenCalledTimes(1);
});
