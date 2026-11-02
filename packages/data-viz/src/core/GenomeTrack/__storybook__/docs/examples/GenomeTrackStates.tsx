// Loading, error, and empty states. The error `code` picks the headline and
// `message` is shown underneath.

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
