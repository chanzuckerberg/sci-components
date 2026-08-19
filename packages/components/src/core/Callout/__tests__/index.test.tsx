import { fireEvent, render, screen } from "@testing-library/react";
import Callout from "..";

const EXTRA_CONTENT = "Extra content";

describe("<Callout />", () => {
  it("shows its children only while an expandable Callout is open", () => {
    render(
      <Callout intent="info" sdsStyle="expandable" title="Title">
        <p>{EXTRA_CONTENT}</p>
      </Callout>
    );

    expect(screen.getByText(EXTRA_CONTENT)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "close" }));

    expect(screen.queryByText(EXTRA_CONTENT)).not.toBeInTheDocument();
  });

  it("keeps its children out of a Callout that is not expandable", () => {
    render(
      <Callout intent="info" sdsStyle="persistent" title="Title">
        <p>{EXTRA_CONTENT}</p>
      </Callout>
    );

    // Only the expandable style has somewhere to put them.
    expect(screen.queryByText(EXTRA_CONTENT)).not.toBeInTheDocument();
  });

  it("shows extraContent alongside the children it is given", () => {
    render(
      <Callout
        intent="info"
        sdsStyle="expandable"
        title="Title"
        extraContent={<p>{EXTRA_CONTENT}</p>}
      >
        <p>Children</p>
      </Callout>
    );

    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(screen.getByText(EXTRA_CONTENT)).toBeInTheDocument();
  });

  it("takes extraContent on its own", () => {
    render(
      <Callout
        intent="info"
        sdsStyle="expandable"
        title="Title"
        extraContent={<p>{EXTRA_CONTENT}</p>}
      />
    );

    expect(screen.getByText(EXTRA_CONTENT)).toBeInTheDocument();
  });

  it("keeps extraContent out of a Callout that is not expandable", () => {
    render(
      <Callout
        intent="info"
        sdsStyle="persistent"
        title="Title"
        extraContent={<p>{EXTRA_CONTENT}</p>}
      />
    );

    expect(screen.queryByText(EXTRA_CONTENT)).not.toBeInTheDocument();
  });
});
