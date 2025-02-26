import {
  LayerManager,
  OrthographicCamera,
  SingleMeshLayer,
  WebGLRenderer,
} from "@";

const singleMeshLayer = new SingleMeshLayer();
const layersManager = new LayerManager();
layersManager.add(singleMeshLayer);

const renderer = new WebGLRenderer("#canvas");
const camera = new OrthographicCamera(0, 870, 0, 870);

function animate() {
  renderer.render(layersManager, camera);
  requestAnimationFrame(animate);
}

animate();
