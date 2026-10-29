import {
  RenderStructureImageOptions,
  renderStructureImage,
} from "@data-viz/src/core/ProteinStructureViewer";
import { Args } from "@storybook/react-vite";
import { useEffect, useState } from "react";

/** Size of the rendered image, in CSS pixels. */
const IMAGE_WIDTH = 480;
const IMAGE_HEIGHT = 360;

/**
 * An image `renderStructureImage` renders from the story's scene args, with no
 * viewer on the page.
 */
export function HeadlessRenderStory(props: Args): JSX.Element {
  const {
    chainColors,
    colorBy,
    hiddenChains,
    highlights,
    orientation,
    plddt,
    representation,
    structure,
  } = props;
  const [image, setImage] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let url: string | null = null;

    const options: RenderStructureImageOptions = {
      backgroundColor: "#FFFFFF",
      chainColors,
      colorBy,
      height: IMAGE_HEIGHT,
      hiddenChains,
      highlights,
      orientation,
      plddt,
      representation,
      structure,
      width: IMAGE_WIDTH,
    };

    renderStructureImage(options)
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setImage(url);
      })
      .catch((error: Error) => {
        if (!cancelled) setFailure(error.message);
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [
    chainColors,
    colorBy,
    hiddenChains,
    highlights,
    orientation,
    plddt,
    representation,
    structure,
  ]);

  return (
    <div style={{ alignItems: "flex-start", display: "flex", gap: 24 }}>
      <figure style={{ margin: 0, width: IMAGE_WIDTH }}>
        {image ? (
          <img
            alt="The same structure, rendered without the viewer"
            height={IMAGE_HEIGHT}
            src={image}
            width={IMAGE_WIDTH}
          />
        ) : (
          <p role="status">{failure ?? "Rendering..."}</p>
        )}
        <figcaption>Rendered by renderStructureImage</figcaption>
      </figure>
    </div>
  );
}
