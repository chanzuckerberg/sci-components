import{i as e}from"./preload-helper-xPQekRTU.js";var t,n=e((()=>{t=`<h1>Getting Started</h1>
<p>
  Let the following guides serve as starting points for working with the SDS.
  Understand how to use the design system libraries within Figma, navigate the
  documentation, contribute new components to the design system, access the SDS
  codebase, and incorporate coded components into application builds.
</p>
<h2>For Designers</h2>
<h3>Overview</h3>
<p>
  The Science Design System (SDS) brings consistency and universal standards to
  CZI's science products.
</p>
<p></p>
<p>
  Within Figma, the elements of the SDS are accessible to product designers via
  a collection of published libraries. These libraries have been built to allow
  for maximum flexibility depending on each product team's component needs.
</p>
<p></p>
<p>
  The SDS Documentation serves as an in-depth guide for both designers and
  engineers for using elements of the design system within projects.
</p>
<p></p>
<p>
  In instances where the available SDS components don't fulfill a product team's
  needs, there is a straightforward process for requesting additional elements
  for the design system.
</p>
<hr />
<p></p>
<h3>Figma</h3>
<h4>Library structure</h4>
<p>
  Instead of consolidating all elements into the same Figma library, the SDS
  team has broken out each element type into separate libraries: SDS Bases, SDS
  Typography, SDS Icons, and SDS Components. Each of these libraries can be
  turned on or off depending on the needs of the individual product team. This
  ensures product designers' project files aren't cluttered with unnecessary
  elements and they only see the pieces of the SDS that are relevant to them.
</p>
<blockquote class="sds-doc-blockquote">
  <p>
    For example, CZ ID and CZ GEN EPI use the same fonts in both of their
    products, whereas Single Cell and Napari use their own unique typography and
    therefore have no need for the SDS Typography library to be enabled in their
    project files. All four products use the same icon set, meaning all four
    will have the SDS Icons library enabled in their project files.
  </p>
</blockquote>
<p>
  The SDS Components library is not intended to be used by itself, but instead
  feeds into component sub-libraries for each product. This ensures each
  component is built consistently and has the same functionality and props,
  while allowing for visual customization of every component to align with each
  product's look and feel. Each product sub-library contains any
  product-specific colors (generally Primary and Info colors) and typography.
</p>
<blockquote class="sds-doc-blockquote">
  <p>
    For example, designers on CZ ID and CZ GEN EPI will both be using the same
    Button component and all of its variant options, while CZ ID's primary
    Button will be blue and pulled from the CZ ID Components library and CZ GEN
    EPI's will be purple and pulled from the CZ GEN EPI Components library.
  </p>
</blockquote>
<hr />
<p></p>
<h3>SDS Documentation</h3>
<p>
  The SDS documentation should be the go-to place to learn about using elements
  of the design system within projects. It is not intended to be used only by
  designers, but by anyone on a product team looking to better familiarize
  themselves with all of the pieces of the design system and how it can be best
  leveraged in product work.
</p>
<p>Below are a few tips around navigating the documentation:</p>
<ul class="sds-doc-bullet-list">
  <li>
    <p>
      Visit the
      <a
        href="./?path=/docs/design-documentation-sds-overview-element-status-tracker--docs"
        target="_top"
        >Element Status Tracker</a
      >
      page for the most up-to-date view of which elements are available for use
      within the Figma libraries and the SDS codebase; a more detailed status
      spreadsheet is linked at the bottom of this page for an in-depth look at
      status by component variant as well as links to implementation tickets for
      a granular view of when to expect components to be available for use
    </p>
  </li>
  <li>
    <p>
      Most components have a Live Preview section on their Overview tabs; this
      displays an interactive instance of the element, providing the ability to
      engage with it and get a better feel for how it will work when included as
      part of a product build
    </p>
  </li>
  <li>
    <p>
      Each variant of every component is viewable on their Overview tabs; aside
      from displaying all of the available props for each variant, these views
      are able to be clicked on and inspected to get further design details such
      as typography and color styles, border radiuses, spacing, etc.
    </p>
  </li>
  <li>
    <p>
      On every component page there is a Code tab containing individual iframes
      imported from Storybook of each variant available to that component; each
      iframe has all of the same functionality found within Storybook, allowing
      engineers to explore props, adjust colors and text, see any event
      handlers, etc. all without leaving the documentation site
    </p>
  </li>
</ul>
<hr />
<p></p>
<h3>Contributing to the SDS</h3>
<p>
  If a product need arises for a component that doesn't exist in the SDS, a
  request can be made to the SDS team to design and add it into the system. To
  do so, follow the steps below:
</p>
<ol class="sds-doc-ordered-list">
  <li>
    <p>
      Take a second look through the SDS Documentation to double check the
      product need can indeed not be satisfied by an existing SDS component
    </p>
  </li>
  <li>
    <p>
      Post the component request to the
      <a href="https://czi-sci.slack.com/archives/C032S43KKFV)."
        >#sci-design-system-support</a
      >
      channel in Slack using the following request template to ensure all of the
      necessary details are captured for the SDS team:
    </p>
  </li>
</ol>
<p>
  Once a request is submitted, the SDS team will conduct an evaluation across
  all Science products to determine whether the new component would be
  beneficial to multiple products and should become part of the SDS. If it is
  determined that the requested component be added into the SDS, the SDS team
  will work with the requesting team to build, review, test, and incorporate the
  new component into the system.
</p>
<p>
  If it is determined that the new component should not become part of the SDS,
  it will become the requesting product team's responsibility to design and
  maintain the component on their own.
</p>
<p>
  See a more detailed flow of the component request process
  <a
    href="https://www.figma.com/file/xOilnM2h1jnnrxOpLBPsd8/SDS-Contribution-Flow?node-id=0%3A1"
  >
    here
  </a>
  .
</p>
<p></p>
<h2>For Engineers</h2>
<h3>Overview</h3>
<p>
  The Science Design System (SDS) brings consistency and universal standards to
  CZI’s science products by offering a library of high quality, reusable
  components that deliver predictable, accessible and easy to learn experiences.
  Our goal is to democratize access to tools and technologies for scientists.
</p>
<hr />
<h3>Packages</h3>
<p>
  The design system ships as four packages, each with an overview page of its
  own covering what it contains, how to install it, and how to use it.
</p>
<table class="sds-doc-table">
  <tr>
    <td style="width: 160px"><p>Package</p></td>
    <td><p>What it is</p></td>
  </tr>
  <tr>
    <td>
      <p>
        <a href="./?path=/docs/components-overview--docs" target="_top"
          >@czi-sds/components</a
        >
      </p>
    </td>
    <td>
      <p>
        The components themselves and the theme they read their colors, spacing
        and typography from. Start here: an app installs this package whether or
        not it uses either of the others. Its overview covers installation, the
        five exports the package ships, and the theme setup an app does once.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p>
        <a href="./?path=/docs/data-viz-overview--docs" target="_top"
          >@czi-sds/data-viz</a
        >
      </p>
    </td>
    <td>
      <p>
        Charts for scientific data, built on Apache ECharts. They are versioned
        and installed on their own because ECharts is large and most apps do not
        need it, and they require <code>@czi-sds/components</code> at runtime.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p>
        <a href="./?path=/docs/icons-overview--documentation" target="_top"
          >@czi-sds/icons</a
        >
      </p>
    </td>
    <td>
      <p>
        The icons SDS draws itself, either because
        <a href="https://phosphoricons.com" target="_blank">Phosphor</a>
        has no equivalent or because we want our own version of one it does
        have. Phosphor covers the rest of the icon set and is installed
        alongside it. The two are the same kind of component, so the only
        difference between them is where an icon is imported from.
      </p>
    </td>
  </tr>
  <tr>
    <td>
      <p>
        <a href="./?path=/docs/mcp-server-overview--docs" target="_top"
          >@czi-sds/mcp</a
        >
      </p>
    </td>
    <td>
      <p>
        A Model Context Protocol server that gives an AI coding agent the real
        props, documentation and design tokens of the system, so the code it
        writes matches the library rather than guessing at it.
      </p>
    </td>
  </tr>
</table>
<hr />
<h3>Contributing to the SDS</h3>
<p>
  If you would like to contribute to the Science Design System by building
  requested components, please follow the contribution guidelines
  <a
    href="https://github.com/chanzuckerberg/sci-components/blob/main/packages/components/docs/contribution.md"
  >
    here
  </a>
  .
</p>
<p>
  If a product need arises for a component that doesn't exist in the SDS, a
  request can be made to the SDS team to design and add it into the system. To
  do so, follow the steps below:
</p>
<ol class="sds-doc-ordered-list">
  <li>
    <p>
      Take a second look through the SDS Documentation to double check the
      product need can indeed not be satisfied by an existing SDS component
    </p>
  </li>
  <li>
    <p>
      Post the component request to the
      <a href="https://czi-sci.slack.com/archives/C032S43KKFV"
        >#sci-design-system-support</a
      >
      channel in Slack using the following request template to ensure all of the
      necessary details are captured for the SDS team:
    </p>
  </li>
</ol>
<p>
  Once a request is submitted, the SDS team will conduct an evaluation across
  all Science products to determine whether the new component would be
  beneficial to multiple products and should become part of the SDS. If it is
  determined that the requested component be added into the SDS, the SDS team
  will work with the requesting team to build, review, test, and incorporate the
  new component into the system.
</p>
<p>
  If it is determined that the new component should not become part of the SDS,
  it will become the requesting product team's responsibility to design and
  maintain the component on their own.
</p>
<p>
  See a more detailed flow of the component request process
  <a
    href="https://www.figma.com/file/xOilnM2h1jnnrxOpLBPsd8/SDS-Contribution-Flow?node-id=0%3A1"
  >
    here
  </a>
  .
</p>
`}));export{n,t};