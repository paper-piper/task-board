import { TaskDetails } from "@/shared/types/TaskDetails";

export const sampleTasksDetails: TaskDetails[] = [
  {
    id: "1241340",
    description:
      "Conduct a full audit of the existing design system, cataloguing every component, token, and pattern currently in use across the product. Identify inconsistencies in spacing, color usage, and typography, and produce a report recommending consolidation before the new component library work begins.",
    assignee: "Maya Chen",
    reporter: "Daniel Ortiz",
    priority: "medium",
    tags: ["design-system", "audit", "ux"],
    createdAt: "2026-05-04",
    dueDate: "2026-05-22",
    estimatedHours: 40,
    acceptanceCriteria: [
      "Every component in the current UI is catalogued with screenshots",
      "Inconsistencies in spacing/typography/color are documented",
      "A prioritized recommendation list is delivered to the design team",
    ],
    comments: [
      {
        author: "Daniel Ortiz",
        date: "2026-05-06",
        message:
          "Please include the legacy admin panel in scope, it's still customer-facing.",
      },
      {
        author: "Maya Chen",
        date: "2026-05-10",
        message:
          "Found 14 distinct button styles so far. This is worse than we thought.",
      },
    ],
    attachments: ["design-audit-worksheet.fig", "component-inventory.xlsx"],
  },
  {
    id: "1241341",
    description:
      "Write the full functional specification for the new marketing website, covering page-by-page requirements, user flows, CMS content model, and third-party integrations (analytics, newsletter signup, live chat). This spec will serve as the source of truth for the CI/CD, auth, and layout workstreams.",
    assignee: "Priya Nair",
    reporter: "Daniel Ortiz",
    priority: "high",
    tags: ["spec", "website", "planning"],
    createdAt: "2026-04-28",
    dueDate: "2026-05-15",
    estimatedHours: 32,
    acceptanceCriteria: [
      "All top-level pages and their content sections are enumerated",
      "CMS content model is defined and reviewed by engineering",
      "Third-party integration requirements are signed off by stakeholders",
    ],
    comments: [
      {
        author: "Priya Nair",
        date: "2026-05-01",
        message: "Marketing wants a blog section added, updating scope.",
      },
    ],
    attachments: ["website-functional-spec-v3.pdf"],
  },
  {
    id: "1241342",
    description:
      "Stand up a CI/CD pipeline covering lint, type-check, test, build, and deploy stages for the website repo. Pipeline should run on every pull request and auto-deploy the main branch to staging, with a manual gate for production releases.",
    assignee: "Tomasz Wojcik",
    reporter: "Priya Nair",
    priority: "high",
    tags: ["infra", "ci-cd", "devops"],
    createdAt: "2026-05-16",
    dueDate: "2026-06-02",
    estimatedHours: 24,
    acceptanceCriteria: [
      "PRs trigger lint, type-check and test stages automatically",
      "Merges to main auto-deploy to staging within 5 minutes",
      "Production deploys require explicit manual approval",
    ],
    comments: [
      {
        author: "Tomasz Wojcik",
        date: "2026-05-18",
        message:
          "Going with GitHub Actions + Vercel for hosting, matches the rest of the org.",
      },
      {
        author: "Priya Nair",
        date: "2026-05-20",
        message: "Sounds good, make sure secrets are scoped per-environment.",
      },
    ],
    attachments: ["ci-pipeline-diagram.png"],
  },
  {
    id: "1241343",
    description:
      "Implement the full authentication flow including sign up, login, password reset, and session management. Should support email/password to start, with the architecture left open for OAuth providers later. Includes protected route handling on the frontend.",
    assignee: "Leah Kim",
    reporter: "Maya Chen",
    priority: "critical",
    tags: ["auth", "security", "frontend", "backend"],
    createdAt: "2026-05-05",
    dueDate: "2026-06-10",
    estimatedHours: 60,
    acceptanceCriteria: [
      "Users can sign up, log in, and reset their password end-to-end",
      "Sessions persist securely via httpOnly cookies",
      "Protected routes redirect unauthenticated users to login",
      "Passwords are hashed with bcrypt or equivalent, never stored in plaintext",
    ],
    comments: [
      {
        author: "Leah Kim",
        date: "2026-05-12",
        message:
          "Blocked briefly on the design system audit finishing so form components match.",
      },
      {
        author: "Maya Chen",
        date: "2026-05-13",
        message: "Audit report is out, form patterns are on page 4.",
      },
    ],
    attachments: ["auth-flow-diagram.png", "session-security-notes.md"],
  },
  {
    id: "1241344",
    description:
      "Sweep the application for responsive layout regressions across mobile, tablet, and desktop breakpoints. Focus areas reported by QA include the task grid overflowing on narrow viewports and the card selector overlapping on tablet portrait mode.",
    assignee: "Omar Farouk",
    reporter: "QA Team",
    priority: "medium",
    tags: ["bug", "css", "responsive"],
    createdAt: "2026-05-20",
    dueDate: "2026-05-27",
    estimatedHours: 12,
    acceptanceCriteria: [
      "Task grid no longer overflows horizontally below 768px",
      "Card selector renders correctly in tablet portrait mode",
      "Fixes verified on iOS Safari and Chrome Android",
    ],
    comments: [
      {
        author: "Omar Farouk",
        date: "2026-05-21",
        message:
          "Root cause is a hardcoded min-width on the grid container, easy fix.",
      },
    ],
    attachments: ["bug-screenshots-mobile.zip"],
  },
  {
    id: "1241345",
    description:
      "Produce developer-facing API documentation covering all REST endpoints exposed by the backend, including request/response schemas, auth requirements, error codes, and example curl requests. Publish via the internal docs site.",
    assignee: "Priya Nair",
    reporter: "Tomasz Wojcik",
    priority: "low",
    tags: ["documentation", "api"],
    createdAt: "2026-06-03",
    dueDate: "2026-06-20",
    estimatedHours: 20,
    acceptanceCriteria: [
      "Every public endpoint has a documented schema and example",
      "Auth requirements and error codes are listed per endpoint",
      "Docs are published and linked from the developer portal",
    ],
    comments: [],
    attachments: ["api-docs-outline.md"],
  },
  {
    id: "1241346",
    description:
      "Build and run an integration test suite covering the interactions between CI/CD, auth, and documented API endpoints. Ensure the pipeline fails fast on regressions before they reach staging.",
    assignee: "Leah Kim",
    reporter: "Tomasz Wojcik",
    priority: "high",
    tags: ["testing", "qa", "ci-cd"],
    createdAt: "2026-06-05",
    dueDate: "2026-06-25",
    estimatedHours: 36,
    acceptanceCriteria: [
      "Integration tests cover all critical auth and API flows",
      "Suite runs automatically in the CI pipeline on every PR",
      "Test failures block merges to main",
    ],
    comments: [
      {
        author: "Leah Kim",
        date: "2026-06-08",
        message:
          "Waiting on the API docs to lock down expected error shapes before writing negative-path tests.",
      },
    ],
    attachments: ["integration-test-plan.pdf"],
  },
  {
    id: "1241347",
    description:
      "Coordinate and execute the production launch: final smoke tests, DNS cutover, monitoring/alerting setup, and rollback plan. This is the culminating task gating go-live for the whole website project.",
    assignee: "Daniel Ortiz",
    reporter: "Daniel Ortiz",
    priority: "critical",
    tags: ["launch", "release", "ops"],
    createdAt: "2026-06-26",
    dueDate: "2026-07-05",
    estimatedHours: 16,
    acceptanceCriteria: [
      "Smoke tests pass on production immediately after deploy",
      "Monitoring and alerting are live and paging the right on-call",
      "A documented rollback plan is in place and rehearsed",
    ],
    comments: [
      {
        author: "Daniel Ortiz",
        date: "2026-06-27",
        message:
          "Launch window set for early morning to minimize traffic impact.",
      },
    ],
    attachments: ["launch-runbook.pdf", "rollback-plan.md"],
  },
];
