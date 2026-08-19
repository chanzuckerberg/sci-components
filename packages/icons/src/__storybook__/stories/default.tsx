import { Args } from "@storybook/react-vite";
import * as sdsIcons from "@czi-sds/icons";
import type { Icon } from "@czi-sds/icons";

/**
 * The icons this package ships, by export name. Every export is an
 * `Sds<Name>Icon`, which is what separates them from the `createSdsIcon` factory
 * the package also exports.
 */
export const ICON_NAMES = Object.keys(sdsIcons)
  .filter((name) => name.startsWith("Sds") && name.endsWith("Icon"))
  .sort();

const icons = sdsIcons as unknown as Record<string, Icon>;

/**
 * `icon` is the story's own control rather than a prop: there is no single icon
 * component to point the controls at, so the story picks one of the sixteen and
 * hands it everything else as-is.
 */
export const IconDemo = (props: Args): JSX.Element => {
  const { icon, ...iconProps } = props;
  const SdsIcon = icons[icon] ?? icons[ICON_NAMES[0]];

  return <SdsIcon {...iconProps} />;
};
