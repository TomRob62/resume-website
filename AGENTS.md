# AGENTS.md

## Coding Practices for Web Development with Next.js

This project follows best practices for modern web development using Next.js and TypeScript. All contributors and agents should adhere to the following guidelines to ensure code quality, maintainability, and performance.

### 1. Code Structure & Organization
- Use the `app/` directory for routing and page components (Next.js App Router).
- Organize components, hooks, and utilities in clearly named folders.
- Prefer co-locating styles (e.g., CSS modules) with their components.
- Keep files and functions small and focused.

### 2. TypeScript & Type Safety
- Use TypeScript for all code. Avoid using `any` unless absolutely necessary.
- Define and export types/interfaces for props and shared data structures.
- Use type inference and utility types to reduce repetition.

### 3. Styling
- Use CSS Modules or Tailwind CSS for component-level styles.
- Avoid global styles except for resets and base typography.
- Prefer semantic HTML and accessible markup.

### 4. Data Fetching & State Management
- Use Next.js data fetching methods (`fetch`, `getServerSideProps`, `getStaticProps`, or React Server Components) as appropriate.
- Prefer React context or lightweight state libraries for global state.
- Avoid prop drilling by using context or custom hooks.

### 5. Performance
- Use dynamic imports and code splitting for large or rarely used components.
- Optimize images with Next.js `<Image />` component.
- Minimize bundle size by only importing what you need.
- Use memoization (`useMemo`, `useCallback`) for expensive computations.

### 6. Accessibility (a11y)
- Use semantic HTML elements and ARIA attributes where needed.
- Ensure all interactive elements are keyboard accessible.
- Test with screen readers and accessibility tools.

### 7. Linting & Formatting
- Use ESLint and Prettier to enforce code style and catch errors early.
- Fix all lint and type errors before committing code.

### 8. Testing
- Write unit and integration tests for components and utilities.
- Use Jest and React Testing Library (or similar) for testing.
- Ensure all tests pass before merging changes.


### 10. Security
- Validate and sanitize all user input.

