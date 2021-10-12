module.exports = {
  // (thuang) Use `main` instead of `master`
  // https://github.com/semantic-release/semantic-release/issues/1581#issuecomment-647657317
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "main",
    "next",
    "next-major",
    {
      name: "beta",
      prerelease: true,
    },
    {
      name: "alpha",
      prerelease: true,
    },
  ],
};
