import {
  LayerManager,
  ImageLayer,
  OrthographicCamera,
  WebGLRenderer,
  OmeZarrImageSource,
} from "@";
import { PanZoomControls } from "@/objects/cameras/controls";

const sliderMin = document.getElementById("slider-min") as HTMLInputElement;
const labelMin = document.getElementById("label-min") as HTMLLabelElement;
const sliderMax = document.getElementById("slider-max") as HTMLInputElement;
const labelMax = document.getElementById("label-max") as HTMLLabelElement;

const url =
  "https://files.cryoetdataportal.cziscience.com/10444/24apr23a_Position_12/Reconstructions/VoxelSpacing4.990/Tomograms/100/24apr23a_Position_12.zarr";
const pixelScale = 4.99;
const layerManager = new LayerManager();
const renderer = new WebGLRenderer("#canvas");
const camera = new OrthographicCamera(
  0,
  pixelScale * 1264,
  0,
  pixelScale * 1264
);
const controls = new PanZoomControls(camera, camera.position);
renderer.setControls(controls);
const region = [{ dimension: "z", index: pixelScale * 120 }];

const source = new OmeZarrImageSource(url);
const layer = new ImageLayer({ source, region });
layerManager.add(layer);

const onMinChange = () => {
  const minValue = sliderMin.valueAsNumber;
  const maxValue = sliderMax.valueAsNumber;
  if (minValue >= maxValue) {
    sliderMin.value = (maxValue - Number(sliderMin.step)).toString();
  } else {
    labelMin.innerText = `Min: ${minValue.toString()}`;
    layer.setChannelProps([{ contrastLimits: [minValue, maxValue] }]);
  }
};

const onMaxChange = () => {
  const maxValue = sliderMax.valueAsNumber;
  const minValue = sliderMin.valueAsNumber;
  if (maxValue <= minValue) {
    sliderMax.value = (minValue + Number(sliderMax.step)).toString();
  } else {
    labelMax.innerText = `Max: ${maxValue.toString()}`;
    layer.setChannelProps([{ contrastLimits: [minValue, maxValue] }]);
  }
};

sliderMin.addEventListener("input", onMinChange);
sliderMax.addEventListener("input", onMaxChange);

onMinChange();
onMaxChange();

function animate() {
  renderer.render(layerManager, camera);
  requestAnimationFrame(animate);
}

animate();
