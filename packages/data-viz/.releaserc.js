module.exports = {
  /**
   * (thuang): Merging to `main` branch will not trigger a release.
   * We only want to release from `prod` branch
   * https://github.com/semantic-release/semantic-release/issues/1581#issuecomment-647657317
   */
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "prod",
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
