import {
  LayerManager,
  ImageLayer,
  OrthographicCamera,
  WebGLRenderer,
  OmeZarrImageSource,
} from "@";
import { PanZoomControls } from "@/objects/cameras/controls";
import {
  loadOmeZarrPlate,
  loadOmeZarrWell,
} from "@/data/ome_zarr_hcs_metadata_loader";

// The following data comes from Zenodo: https://zenodo.org/records/11262587
// First download and unpack it. Then host the containing directory locally
// with something like:
// http-server --cors -p 8080
const plateUrl =
  "http://localhost:8080/20200812-CardiomyocyteDifferentiation14-Cycle1_mip.zarr";
const plate = await loadOmeZarrPlate(plateUrl);
console.debug("plate", plate);
if (plate.plate === undefined) {
  throw new Error(`No plate found: ${plate}`);
}
const wellPaths = plate.plate.wells.map((well) => well.path);
const wellSelector = document.querySelector("#well") as HTMLSelectElement;
wellPaths.forEach((path) => {
  const option = document.createElement("option");
  option.value = path;
  option.text = path;
  wellSelector.appendChild(option);
});

const layerManager = new LayerManager();
const renderer = new WebGLRenderer("#canvas");
const camera = new OrthographicCamera(0, 840, 0, 360);
const controls = new PanZoomControls(camera, camera.position);
renderer.setControls(controls);
const region = [
  { dimension: "c", index: { start: 0, stop: 3 } },
  { dimension: "z", index: 0 },
];

const imageSelector = document.querySelector("#image") as HTMLSelectElement;

const onImageChange = async () => {
  console.debug("onImageChange: ", imageSelector.value);
  layerManager.layers.length = 0;
  const imageUrl =
    plateUrl + "/" + wellSelector.value + "/" + imageSelector.value;
  const source = new OmeZarrImageSource(imageUrl);
  const layer = new ImageLayer({
    source,
    region,
    channelProps: [
      // color and contrast limits manually looked up in the zarr omero metadata
      { color: [0, 1, 1], contrastLimits: [110, 800] },
      { color: [1, 0, 1], contrastLimits: [110, 250] },
      { color: [1, 1, 0], contrastLimits: [110, 800] },
    ],
  });
  layerManager.add(layer);
};

const onWellChange = async () => {
  console.debug("onWellChange: ", wellSelector.value);
  layerManager.layers.length = 0;
  const path = wellSelector.value;
  const well = await loadOmeZarrWell(plateUrl, path);
  console.debug("well", well);
  if (well.well === undefined) {
    throw new Error(`No well found: ${well}`);
  }
  const imagePaths = well.well.images.map((image) => image.path);
  imageSelector.innerHTML = "";
  imagePaths.forEach((path) => {
    const option = document.createElement("option");
    option.value = path;
    option.text = path;
    imageSelector.appendChild(option);
  });
  await onImageChange();
};

wellSelector.addEventListener("change", onWellChange);
imageSelector.addEventListener("change", onImageChange);
await onWellChange();

function animate() {
  renderer.render(layerManager, camera);
  requestAnimationFrame(animate);
}

animate();
