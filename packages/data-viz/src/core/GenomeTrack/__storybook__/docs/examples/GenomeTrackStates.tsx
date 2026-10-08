// The three states that replace the plot entirely. Each is a prop rather than
// something the caller renders instead of the track, so the surrounding layout
// does not have to change as a window loads, fails, or is cleared.
//
// `loading` draws a skeleton shaped like the rows in `tracks`, so the layout
// does not jump when the data lands. `error` takes a typed tool error: the code
// chooses the headline and the server's message is shown underneath, so a
// missing activation cache reads differently from a region nobody precomputed.
// An unrecognised code falls back to the message alone.

import { GenomeTrack } from "@czi-sds/data-viz";

const CAPTION = {
  color: "rgb(0 0 0 / 60%)",
  fontSize: 12,
  marginBottom: 4,
};

function App() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <div style={CAPTION}>loading</div>
        <GenomeTrack
          data={null}
          loading
          tracks={["annotations", "segments", "features"]}
        />
      </div>

      <div>
        <div style={CAPTION}>error</div>
        <GenomeTrack
          data={null}
          error={{
            code: "dependency_unavailable",
            message:
              "Continuous activation cache is not loaded for e_coli_k12.",
          }}
        />
      </div>

      <div>
        <div style={CAPTION}>empty — nothing loaded yet</div>
        <GenomeTrack data={null} />
      </div>
    </div>
  );
}

export default App;
