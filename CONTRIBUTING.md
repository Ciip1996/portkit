# Contributing

Thank you for considering contributing to this open-source portfolio template! Contributions of all kinds are welcome — bug fixes, new features, documentation improvements, or design enhancements.

## Getting Started

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/your-username/ciip.git
   cd ciip
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Development Workflow

1. Create a new branch for your change:
   ```bash
   git checkout -b feat/your-feature-name
   # or
   git checkout -b fix/your-bug-description
   ```

2. Make your changes following the conventions below.

3. Run the linter before committing:
   ```bash
   npm run lint
   ```

4. Commit with a clear message:
   ```bash
   git commit -m "feat: add dark/light mode toggle to admin"
   ```

5. Push and open a Pull Request against `main`.

## Conventions

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructure, no feature/fix |
| `chore:` | Build scripts, dependencies |

### Code Style

- TypeScript everywhere — no `any` unless unavoidable
- Tailwind utility classes for styling
- Framer Motion for animations
- `"use client"` only when needed (hooks, event handlers, motion)
- All new section components live in `modules/<name>/`
- All hardcoded personal data belongs in `config/portfolio.ts` or `lib/i18n/en.ts`

### File Structure

```
config/         ← personal branding & social config (edit this to customize)
lib/i18n/       ← all portfolio content (en.ts / es.ts)
modules/        ← one folder per portfolio section
app/admin/      ← admin CMS panel
app/api/        ← Next.js API routes
```

## Reporting Bugs

Please use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) and include:

- Steps to reproduce
- Expected vs actual behaviour
- Node.js and npm versions (`node -v && npm -v`)
- Any relevant error messages or screenshots

## Requesting Features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.yml). Please describe the use case — not just the solution you have in mind.

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Update documentation if you change behavior
- Add a screenshot or recording for UI changes
- Reference related issues with `Closes #123`

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
