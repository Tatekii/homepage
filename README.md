# Personal Developer Portfolio

A modern, purple-themed developer portfolio with animated background effects, a collapsible music player, project cards, and a single-page layout with multiple sections.

## Features

- 🎨 Modern purple-themed design with gradient effects
- ✨ Interactive particle animation background
- 🎵 Collapsible music player
- 📱 Responsive layout for all devices
- 🚀 Fast performance with Next.js and React
- 🔄 Animated section transitions

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Git Workflow & Versioning

This project uses conventional commits and automated CHANGELOG generation.

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This allows for automated changelog generation and semantic versioning.

Format: `<type>(<scope>): <subject>`

Examples:
- `feat(ui): add new skill badges`
- `fix(animation): fix particle animation on mobile devices`
- `docs: update README with new instructions`
- `style(homepage): improve spacing in project cards`
- `refactor(components): extract skills into separate component`

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

### Releasing New Versions

To create a new release and update the CHANGELOG.md file:

```bash
# Patch release (0.0.x) - for bug fixes
pnpm release:patch

# Minor release (0.x.0) - for new features
pnpm release:minor

# Major release (x.0.0) - for breaking changes
pnpm release:major
```

## License

MIT
