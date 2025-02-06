import { generateSnapshots } from "@chanzuckerberg/story-utils";
import { composeStories } from "@storybook/react";
import { fireEvent, render, screen } from "@testing-library/react";
import * as stories from "../__storybook__/index.stories";

global.ResizeObserver = class {
  observe() {}

  unobserve() {}

  disconnect() {}
};

// Returns a component that already contain all decorators from story level, meta level and global level.
const { Test, Default } = composeStories(stories);

describe("<NavigationHeder />", () => {
  generateSnapshots(stories);

  it("renders navigation header component", () => {
    render(<Test />);
    expect(screen.getAllByTestId("navigation-header").length).toBeGreaterThan(
      0
    );
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
        logoUrl="https://example.com"
      />
    );

    const logoLink = screen.getByRole("link");
    expect(logoLink).toHaveAttribute("href", "https://example.com");
  });

  it("displays primary navigation items", () => {
    render(
      <Test
        primaryNavItems={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
        activePrimaryNavKey="home"
      />
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("changes the active primary navigation item when clicked", () => {
    const setActivePrimaryNavKey = jest.fn();

    render(
      <Test
        primaryNavItems={[
          { key: "home", label: "Home" },
          { key: "about", label: "About" },
        ]}
        activePrimaryNavKey="home"
        setActivePrimaryNavKey={setActivePrimaryNavKey}
      />
    );

    fireEvent.click(screen.getByText("About"));
    expect(setActivePrimaryNavKey).toHaveBeenCalledWith("about");
  });

  it("displays the search bar when enabled", () => {
    render(<Test showSearch={true} />);

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("displays secondary navigation items", () => {
    render(
      <Test
        secondaryNavItems={[
          { label: "Profile", type: "text" },
          { label: "Settings", type: "text" },
        ]}
      />
    );

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders buttons and handles button clicks correctly", () => {
    const onClickMock = jest.fn();

    render(
      <Test
        buttons={[
          { children: "Click Me", onClick: onClickMock, sdsStyle: "rounded" },
        ]}
      />
    );

    fireEvent.click(screen.getByText("Click Me"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<Default />);
    expect(asFragment()).toMatchSnapshot();
  });
});
