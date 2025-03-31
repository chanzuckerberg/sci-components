import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}

  unobserve() {}

  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

const LINK_URL = "https://example.com";

// Returns a component that already contains all decorators from story level, meta level and global level.
const { Test, Default } = composeStories(stories);

describe("<NavigationFooter />", () => {
  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks();
  });

  generateSnapshots(stories);

  it("renders navigation footer component", () => {
    render(<Test />);

    const footerElement = screen.getByTestId("navigation-footer");
    expect(footerElement).not.toBeNull();
  });

  it("displays the logo and title correctly", () => {
    render(
      <Test
        logo={<img src="logo.png" alt="Company Logo" />}
        title="Test Title"
      />
    );

    expect(screen.getAllByAltText("Company Logo").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Test Title").length).toBeGreaterThan(0);
  });

  it("renders the logo link if logoUrl is provided", () => {
    render(
      <Test
        logo={<img src="logo.png" alt="Company Logo" />}
        logoUrl={LINK_URL}
      />
    );

    const logoLink = screen.getByRole("link", { name: /Company Logo/i });
    expect(logoLink).toHaveAttribute("href", LINK_URL);
  });

  it("displays navigation items with correct links", () => {
    const navItems = [
      { label: "Nav Item 1", url: LINK_URL },
      { label: "Nav Item 2", url: `${LINK_URL}/2` },
    ];

    render(<Test navItems={navItems} />);

    const links = screen.getAllByRole("link");
    const navLinks = links.filter(
      (link) =>
        link.textContent === "Nav Item 1" || link.textContent === "Nav Item 2"
    );

    expect(navLinks[0]).toHaveAttribute("href", LINK_URL);
    expect(navLinks[1]).toHaveAttribute("href", `${LINK_URL}/2`);
  });

  it("displays footer links with correct urls", () => {
    const navLinks = [
      { label: "Link 1", url: LINK_URL },
      { label: "Link 2", url: `${LINK_URL}/2` },
    ];

    render(<Test navLinks={navLinks} />);

    const links = screen.getAllByRole("link");
    const footerLinks = links.filter(
      (link) => link.textContent === "Link 1" || link.textContent === "Link 2"
    );

    expect(footerLinks[0]).toHaveAttribute("href", LINK_URL);
    expect(footerLinks[1]).toHaveAttribute("href", `${LINK_URL}/2`);
  });

  it("displays images with correct links", () => {
    const images = [
      {
        image: <img src="image1.png" alt="First" />,
        url: LINK_URL,
      },
      {
        image: <img src="image2.png" alt="Second" />,
        url: `${LINK_URL}/2`,
      },
    ];

    render(<Test images={images} />);

    const imageLinks = screen.getAllByRole("link");
    const filteredImageLinks = imageLinks.filter(
      (link) =>
        link.querySelector('img[alt="First"]') ||
        link.querySelector('img[alt="Second"]')
    );

    expect(filteredImageLinks[0]).toHaveAttribute("href", LINK_URL);
    expect(filteredImageLinks[1]).toHaveAttribute("href", `${LINK_URL}/2`);
  });

  it("displays tag with correct color when provided", () => {
    render(<Test tag="Beta" tagColor="beta" />);
    const tag = screen.getByText("Beta");
    expect(tag).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Default />);
    expect(asFragment()).toMatchSnapshot();
  });
});
