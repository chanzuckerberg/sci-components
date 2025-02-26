import {
  LayerManager,
  ImageLayer,
  WebGLRenderer,
  OmeZarrImageSource,
  OrthographicCamera,
} from "@";
import { AxesLayer } from "@/layers/axes_layer";
import { PanZoomControls } from "@/objects/cameras/controls";

const url =
  "https://public.czbiohub.org/royerlab/zebrahub/imaging/single-objective/ZSNS001.ome.zarr/";
const layerManager = new LayerManager();
const renderer = new WebGLRenderer("#canvas");
const left = 150;
const right = 950;
const top = 100;
const bottom = 900;
const camera = new OrthographicCamera(left, right, top, bottom);
const controls = new PanZoomControls(camera, camera.position);
renderer.setControls(controls);

// Source is 5D, so provide indices at 3 dimensions to project to 2D.
// Also specify a subregion in x and y to exercise that part of the API.
const source = new OmeZarrImageSource(url);
const region = [
  { dimension: "t", index: 400 },
  { dimension: "c", index: 0 },
  { dimension: "z", index: 300 },
  { dimension: "y", index: { start: top, stop: bottom } },
  { dimension: "x", index: { start: left, stop: right } },
];
const channelProps = [{ contrastLimits: [0, 255] as [number, number] }];
const layer = new ImageLayer({ source, region, channelProps });
const axes = new AxesLayer({ length: 2000, width: 0.01 });
layerManager.add(layer);
layerManager.add(axes);

function animate() {
  renderer.render(layerManager, camera);
  requestAnimationFrame(animate);
}

animate();
