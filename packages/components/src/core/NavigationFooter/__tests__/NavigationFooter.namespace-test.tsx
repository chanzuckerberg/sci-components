import { NavigationFooterProps, NavigationFooter } from "@czi-sds/components";

const LINK_URL = "https://example.com";

const NavigationFooterNameSpaceTest = (props: NavigationFooterProps) => {
  return (
    <NavigationFooter
      title="Title"
      backgroundAppearance="matchBackground"
      logo={<div>Logo</div>}
      logoUrl={LINK_URL}
      navItems={[
        {
          label: "Nav Item 1",
          url: LINK_URL,
        },
        {
          label: "Nav Item 2",
          url: LINK_URL,
        },
      ]}
      navLinks={[
        {
          label: "Link 1",
          url: LINK_URL,
        },
        {
          label: "Link 2",
          url: LINK_URL,
        },
      ]}
      images={[
        {
          image: <img src="image1.png" alt="alt text" />,
          url: LINK_URL,
        },
        {
          image: <img src="image2.png" alt="alt text" />,
          url: LINK_URL,
        },
      ]}
      tag="Beta"
      tagColor="beta"
    />
  );
};

export default NavigationFooterNameSpaceTest;
