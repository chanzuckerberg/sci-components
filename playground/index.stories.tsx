import type { Meta, StoryObj } from "@storybook/react-vite";
import { Playground as PlaygroundApp } from "./Playground";

/**
 * The live code playground, hosted as a story so that it inherits Storybook's
 * preview iframe, its build, and its deploy. `buildPlaygroundHref` addresses it
 * by id, which is why the id is pinned rather than derived from the title.
 */
const meta: Meta<typeof PlaygroundApp> = {
  /**
   * Must stay equal to `PLAYGROUND_META_ID` in `./lib/link`, which is what the
   * documentation's links are built from. Written out because Storybook indexes
   * this file by parsing it, without running it, so an imported constant here
   * is a name it cannot resolve. A test in `lib/__tests__/link.test.ts` holds
   * the two together.
   */
  id: "playground",
  /**
   * CSF reads every export of this file as a story, and a production build hands
   * it more than the one below: the minifier mangles this module's own bindings
   * into extra exports named `$`, `$$`, `$0` and so on. A story id is built by
   * stripping a name down to its alphanumeric characters, which leaves `$` with
   * nothing, and the error thrown for it comes back out of the story index as a
   * whole — so every story in the built Storybook becomes unreachable, and the
   * accessibility suite has nothing to test. Naming the story keeps the mangled
   * exports out of CSF's way.
   */
  includeStories: ["Playground"],
  parameters: {
    /**
     * It is an application, not a component: it fills the frame, has no
     * generated documentation page worth reading, and its contents change with
     * whatever is in the URL, which is no use to a snapshot. The accessibility
     * suite exists to hold the component library to account, and most of what
     * it would find here belongs to Monaco: the editor's own syntax colors are
     * what it reports, a shade short of the contrast it asks for.
     *
     * `skip` is the key axe-storybook-testing reads, along with `mode`. It takes
     * no notice of anything else under `axe`, so a name of our own here would be
     * quietly ignored and the suite would run anyway.
     */
    axe: { skip: true },
    chromatic: { disable: true },
    docs: { disable: true },
    layout: "fullscreen",
    options: {
      showPanel: false,
    },
  },
  tags: ["!autodocs", "!test", "!a11ytest"],
  title: "Playground",
};

export default meta;

/**
 * Named to match the meta id, giving the story the `playground--playground` id
 * that the documentation links to.
 */
export const Playground: StoryObj = {
  render: () => <PlaygroundApp />,
};
