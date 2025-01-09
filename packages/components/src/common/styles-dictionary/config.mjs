/* Font-family explanation:
   The following font stack is designed to provide compatibility across multiple operating systems:
   - var(--font-inter): Custom Inter font defined by Next.js.
   - Inter: Standard Inter font fallback.
   - -apple-system, BlinkMacSystemFont: macOS-specific system fonts.
   - Segoe UI: Default system font for Windows.
   - Roboto: Default system font for most Linux distributions.
   - Helvetica Neue, Helvetica, Arial, sans-serif: General fallbacks to ensure compatibility.
   Reference:
   An article explaining how platforms like GitHub and Medium use similar fallback font stacks.
   Link: https://css-tricks.com/snippets/css/system-font-stack/
*/

const config = {
  platforms: {
    css: {
      buildPath: "src/common/styles-dictionary/css/",
      files: [
        {
          destination: "variables.css",
          format: "sds/css",
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "css",
    },
    js: {
      buildPath: "src/common/styles-dictionary/json/",
      files: [
        {
          destination: "tailwind.json",
          format: "sds/tailwind",
          options: {
            prefix: "sds",
          },
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "js",
    },
    scss: {
      buildPath: "src/common/styles-dictionary/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "sds/scss",
        },
      ],
      options: {
        showFileHeader: false,
      },
      transformGroup: "scss",
    },
  },
  source: ["src/common/styles-dictionary/design-tokens/*.json"],
};

export default config;
