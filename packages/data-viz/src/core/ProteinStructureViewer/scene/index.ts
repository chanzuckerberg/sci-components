/**
 * The structure scene without the viewer: what draws a structure on a Mol*
 * plugin, and what renders one straight to an image. Nothing here reaches
 * React, so a caller that only needs the scene brings none of the viewer.
 */
export { applyStructureScene } from "./applyStructureScene";
export { renderStructureImage } from "./renderStructureImage";
export type {
  CameraOrientation,
  CameraProjection,
  CameraState,
  RenderStructureImageOptions,
  ResidueAddress,
  ResidueHighlight,
  StructureColorBy,
  StructureLoadInfo,
  StructureRepresentation,
  StructureSceneHandle,
  StructureSceneOptions,
  ViewerErrorPhase,
} from "../ProteinStructureViewer.types";
