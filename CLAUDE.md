# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

This is a Lerna monorepo with two packages: `@czi-sds/components` and `@czi-sds/data-viz`. Use these commands from the project root:

- `yarn start` - Start Storybook development server on port 6006
- `yarn build` - Build all packages using Lerna
- `yarn test` - Run Jest tests across all packages
- `yarn test:updateSnapshots` - Update Jest snapshots across all packages
- `yarn lint` - Run ESLint and Stylelint across all packages
- `yarn build-storybook` - Build Storybook for production
- `yarn test-storybook` - Run Storybook tests
- `yarn storybook:axe` - Build Storybook and run accessibility tests
- `yarn storybook:axeOnly` - Run accessibility tests without building storybook
- `yarn namespace-check` - Validate TypeScript namespace exports acroos all packages

### Package-specific commands:

- `yarn <script> --scope=@czi-sds/components` - Run script only in components package
- `yarn <script> --scope=@czi-sds/data-viz` - Run script only in data-viz package

### Testing:

- Individual tests: Use `yarn test` with Jest's standard options like `--testNamePattern`
- Type checking: `yarn namespace-check` runs TypeScript namespace validation

## Architecture Overview

### Monorepo Structure

- **Root**: Contains shared configuration (Lerna, ESLint, Stylelint, Jest, Storybook)
- **packages/components**: Main Science Design System (SDS) component library built on Material UI v5
- **packages/data-viz**: Data visualization components (primarily ECharts-based)

### Components Package Architecture

**Built on Material UI v5** - Components are style wrappers that pass props through to MUI components.

**Design System Foundation:**

- `src/common/styles-dictionary/` - Design tokens (colors, spacing, typography, etc.) built with Style Dictionary
- `src/core/styles/` - Theme configuration and utilities
- Design tokens are compiled to CSS variables, SCSS variables, and Tailwind config

**Component Structure:**

- Each component follows consistent structure: `__storybook__/`, `__tests__/`, main component file, `style.ts`
- Components in `src/core/` organized alphabetically
- Storybook stories in `__storybook__/index.stories.tsx`
- Tests include snapshots and namespace validation

**Key Exports:**

1. **Components** - React components with SDS styling
2. **Mixins** - Grouped styles (e.g., `fontHeaderXL`)
3. **Selectors** - Theme helper functions (e.g., `getColors`, `getSpaces`)
4. **CSS/SCSS Variables** - For non-Emotion environments
5. **Tailwind Config** - For Tailwind CSS integration

### Data Viz Package

- ECharts-based visualization components
- Smaller package focused on scientific data visualization
- Shares same build pipeline and testing approach as components package

### Build System

- **Rollup** for bundling (ESM and CJS outputs)
- **TypeScript** with strict configuration
- **Style Dictionary** for design token compilation
- **SWC** for fast compilation in Storybook

### Testing Strategy

- **Jest** with Testing Library for unit tests
- **Storybook** for component development and visual testing
- **Chromatic** for visual regression testing
- **Axe** for accessibility testing
- Snapshot testing for component output validation

## Development Workflow

1. **Component Development**: Create in appropriate `src/core/` directory following existing patterns
2. **Storybook**: Stories are required for all components
3. **Testing**: Unit tests and snapshots required
4. **Design Tokens**: Stored in `src/common/styles-dictionary/design-tokens/`
5. **Icons**: SVG icons in `src/common/svgs/` with corresponding entries in `src/core/Icon/map.ts`

## Versioning and NPM Publishing

### Branch Strategy and Development Workflow

This repository follows a structured branching and release workflow to ensure code quality and safe deployments.

#### 1. Feature Development

**Create Feature Branch**: For every change, create a new branch from `main`

```bash
git checkout main
git pull origin main
git checkout -b <feature-branch-name>
```

**Branch Naming Conventions**:

- Features: `feat/<description>` or `SCIDS-<ticket-number>-<description>`
- Bug fixes: `fix/<description>`
- Documentation: `docs/<description>`

#### 2. Pull Request Process

**Create Pull Request**: After pushing your branch to remote

```bash
git push origin <feature-branch-name>
```

Then create a PR via GitHub targeting the `main` branch.

**Review Requirements**:

- ✅ At least 1 review from the engineering team
- ✅ At least 1 review from the design team
- ✅ All CI checks must pass (tests, linting, build)
- ✅ No merge conflicts with `main`

#### 3. Merging to Main

Once all review requirements are met:

- Squash and merge the PR into `main`
- Delete the feature branch after merge

### Publishing to NPM

The package publishing process is automated through GitHub Actions when changes are pushed to the `prod` branch.

#### 4. Prepare for Release

**Sync prod with main**: First, ensure your local branches are up to date

```bash
git checkout main
git pull origin main
git checkout prod
git pull origin prod
```

#### 5. Update prod Branch

**Pull latest changes from main into prod**:

```bash
git checkout prod
git pull origin main
```

Resolve any conflicts if they arise (though they should be rare with this workflow).

#### 6. Trigger Automated Release

**Push to prod to trigger the release workflow**:

```bash
git push origin prod
```

This push event triggers the automated release workflow which will:

- Run the full test suite
- Build all packages
- Determine version bumps based on conventional commits
- Update package versions and generate CHANGELOGs
- Publish packages to NPM
- Create git tags for the releases

#### 7. Automated PR Creation

After successful publishing, the workflow automatically:

- Creates a PR from `prod` to `main` with version updates
- This PR includes:
  - Updated `package.json` files with new versions
  - Updated `CHANGELOG.md` files
  - Git tags for the release

#### 8. Complete the Cycle

**Merge the automated PR**:

- Review the version bump PR
- Ensure all version changes look correct
- Merge the PR to sync `main` with the latest versions from `prod`

This ensures both branches stay in sync and prevents future conflicts.

### Quick Reference Commands

```bash
# Start new feature
git checkout main && git pull origin main
git checkout -b feat/my-feature

# After PR approval and merge to main
git checkout prod && git pull origin prod
git pull origin main
git push origin prod

# After automated release PR is created
# Review and merge the PR in GitHub UI
```

### Important Release Notes

- **Never push directly to `main` or `prod`** - Always use PRs
- **Version bumps are automatic** - Based on conventional commit messages
- **The release workflow handles**:
  - Version determination
  - CHANGELOG generation
  - NPM publishing
  - PR creation for version sync
- **Manual version overrides**: Contact the release team if specific version control is needed

## Important Notes

- Components are peer-dependency based to prevent version conflicts
- Material UI v5 compatibility is required
- All components should be accessible and follow SDS design principles
- The project uses Yarn workspaces with Lerna for package management
- Conventional commits are used for automated versioning and changelogs
