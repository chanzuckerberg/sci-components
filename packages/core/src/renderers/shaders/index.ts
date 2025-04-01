import projectedLineVertexShader from "./projected_line_vert.glsl";
import projectedLineFragmentShader from "./projected_line_frag.glsl";
import meshVertexShader from "./mesh_vert.glsl";
import meshFragmentShader from "./mesh_frag.glsl";
import floatImageFragmentShader from "./float_image_frag.glsl";
import floatImageArrayFragmentShader from "./float_image_array_frag.glsl";
import uintImageFragmentShader from "./uint_image_frag.glsl";
import uintImageArrayFragmentShader from "./uint_image_array_frag.glsl";

export type Shader =
  | "projectedLine"
  | "mesh"
  | "floatImage"
  | "floatImageArray"
  | "uintImage"
  | "uintImageArray";

export const shaderCode: Record<Shader, { vertex: string; fragment: string }> =
  {
    projectedLine: {
      vertex: projectedLineVertexShader,
      fragment: projectedLineFragmentShader,
    },
    // TODO: a mesh shader without a texture
    mesh: {
      vertex: meshVertexShader,
      fragment: meshFragmentShader,
    },
    // TODO: consolidate image shaders
    floatImage: {
      vertex: meshVertexShader,
      fragment: floatImageFragmentShader,
    },
    floatImageArray: {
      vertex: meshVertexShader,
      fragment: floatImageArrayFragmentShader,
    },
    uintImage: {
      vertex: meshVertexShader,
      fragment: uintImageFragmentShader,
    },
    uintImageArray: {
      vertex: meshVertexShader,
      fragment: uintImageArrayFragmentShader,
    },
  };
