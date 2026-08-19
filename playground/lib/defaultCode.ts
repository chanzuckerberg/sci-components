/**
 * What the playground opens on when the link carries no code of its own.
 *
 * It is written the way the documentation examples are — a default-exported
 * `App`, importing from `@czi-sds/components` as a consumer would — because it
 * doubles as the worked example of what the editor expects.
 */
export const DEFAULT_CODE = `import { Callout } from "@czi-sds/components";

function App() {
  return (
    <Callout
      intent="info"
      title="SDS Playground"
      body="Edit the code on the left and the preview updates as you type."
    />
  );
}

export default App;
`;
