import { Args } from "@storybook/react-vite";
import Callout from "@components/src/core/Callout";
import RawIcon from "@components/src/core/Icon";

export const Icon = (props: Args): JSX.Element => {
  const { sdsIcon, sdsSize, ...rest } = props;

  return (
    <>
      <Callout
        intent="negative"
        title="Deprecated!"
        sdsStyle="persistent"
        icon={<RawIcon sdsIcon="ExclamationMarkCircle" sdsSize="s" />}
        body={
          <>
            The <strong>Icon</strong> component is deprecated!
            <br />
            SDS uses{" "}
            <a
              href="https://phosphoricons.com"
              target="_blank"
              rel="noreferrer"
            >
              Phosphor Icons
            </a>{" "}
            now. Import icons from <strong>@phosphor-icons/react</strong>, and
            the icons SDS draws itself from <strong>@czi-sds/icons</strong>.
          </>
        }
      />
      <RawIcon sdsIcon={sdsIcon} sdsSize={sdsSize} {...rest} />
    </>
  );
};
