import { Args } from "@storybook/react-vite";
import * as sdsIcons from "@czi-sds/icons";
import type { Icon } from "@czi-sds/icons";

/**
 * The icons this package ships, by export name. Everything it exports at runtime
 * is an icon apart from the `createSdsIcon` factory, the types beside them being
 * erased.
 */
export const ICON_NAMES = Object.keys(sdsIcons)
  .filter((name) => name !== "createSdsIcon")
  .sort();

const icons = sdsIcons as unknown as Record<string, Icon>;

/**
 * `icon` is the story's own control rather than a prop: there is no single icon
 * component to point the controls at, so the story picks one of the sixteen and
 * hands it everything else as-is.
 */
export const IconDemo = (props: Args): JSX.Element => {
  const { icon, ...iconProps } = props;
  const SelectedIcon = icons[icon] ?? icons[ICON_NAMES[0]];

  return <SelectedIcon {...iconProps} />;
};
