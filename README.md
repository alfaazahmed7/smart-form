# SmartForm

**Create, customize, publish, and manage forms with an interactive chatbot experience.**

SmartForm is a full-stack form builder that helps users create forms, customize their appearance and chatbot behavior, share them through public links or embedded widgets, and manage collected submissions from a centralized dashboard.

**Live Demo:** [smartform-nu.vercel.app](https://smartform-nu.vercel.app/)

**Repository:** [github.com/alfaazahmed7/smart-form](https://github.com/alfaazahmed7/smart-form)

## Features

- **User Authentication** — Secure registration and login with password hashing, JWT-based sessions, and HTTP-only cookies.
- **Form Builder** — Create and manage forms with customizable titles, descriptions, and questions.
- **Multiple Question Types** — Support for short text, email, multiple-choice, and yes/no questions.
- **Interactive Form Editing** — Reorder questions using drag-and-drop functionality and configure required fields and answer options.
- **Live Preview** — Preview forms while editing and see configuration changes without saving them first.
- **Chatbot Customization** — Configure welcome and completion messages, input placeholders, theme colors, launcher text, chatbot position, opening behavior, and other display settings.
- **Form Publishing and Sharing** — Publish forms and share them using unique public URLs.
- **Embeddable Chatbot Widget** — Provide an interactive form experience through a floating chatbot widget.
- **Submission Management** — Collect form responses and access submissions from the dashboard.
- **Dashboard Overview** — View form-related information through a centralized dashboard.
- **Responsive UI and Theme Support** — Navigate the application across screen sizes with light and dark themes.

## Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Database | PostgreSQL |
| Database Client | `pg` (node-postgres) |
| Authentication | JWT, bcryptjs, HTTP-only cookies |
| UI and Interactions | React Icons, React Toastify, dnd-kit |
| Theme Management | next-themes |
| Animations | Lenis |
| Charts | Recharts |
| Deployment | Vercel |

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed.
- npm installed.
- Access to a PostgreSQL database, such as a local PostgreSQL instance or [Neon](https://neon.tech/).

### 1. Clone the repository

```bash
git clone https://github.com/alfaazahmed7/smart-form.git
cd smart-form
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and configure the following variables:

```env
# PostgreSQL connection string
DATABASE_URL="your_postgresql_connection_string"

# Secret used to sign and verify JWT sessions
JWT_SECRET="your_secure_random_secret"

# Base URL of the application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

Replace the example values with your actual configuration. Use a strong, randomly generated JWT secret and keep database credentials and secrets out of version control.

When deploying, configure the same variables in your hosting provider's environment settings. Update `NEXT_PUBLIC_APP_URL` to the deployed application's base URL.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Verify the application

Run the production build to check that the application compiles successfully:

```bash
npm run build
```

To run ESLint, use:

```bash
npm run lint
```

**Database setup:** Ensure the PostgreSQL database is accessible and the required tables and schema are initialized before using database-dependent features. The application uses the `DATABASE_URL` environment variable to establish its database connection.

## Project Structure

The project uses the Next.js App Router with a `src/`-based structure.

```text
smart-form/
├── public/                         # Static assets and public resources
├── src/
│   ├── app/
│   │   ├── (auth)/                 # Authentication and API routes
│   │   ├── (main)/                 # Public-facing application pages
│   │   ├── dashboard/              # Dashboard and form management
│   │   ├── forms/[publicId]/       # Public form experience
│   │   ├── profile/                # User profile page
│   │   ├── api/                    # Application API routes
│   │   ├── layout.tsx              # Root layout and metadata
│   │   └── globals.css              # Global styles and theme variables
│   ├── components/                 # Reusable UI components
│   ├── lib/                         # Database and shared utilities
│   ├── services/                    # Data access and business logic
│   ├── types/                       # Shared TypeScript types
│   └── proxy.ts                     # Request interception and route protection
├── .gitignore
├── next.config.ts
├── package.json
├── package-lock.json
└── README.md
```

*Note: This is a high-level overview; some routes and files are omitted for readability.*

## Application Overview

SmartForm follows a full-stack Next.js architecture. The App Router handles pages and server-side functionality, while Route Handlers provide API endpoints for authentication, form operations, and submissions.

PostgreSQL stores application data, including users, forms, questions, chatbot settings, and submissions. Database access is managed through a shared `pg` connection pool.

Authentication uses signed JWTs stored in HTTP-only cookies. Protected routes verify the session, and server-side operations should enforce ownership checks before accessing or modifying user-specific resources.

Public forms are accessed through unique public identifiers, allowing published forms to be shared independently of the dashboard.

## Deployment

SmartForm can be deployed to [Vercel](https://vercel.com/) with a PostgreSQL database hosted by a provider such as [Neon](https://neon.tech/).

General deployment steps:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure `DATABASE_URL`, `JWT_SECRET`, and `NEXT_PUBLIC_APP_URL`.
4. Ensure the production database contains the required schema.
5. Deploy and verify authentication, form publishing, public widget access, and submission handling.

## Future Improvements

Potential areas for further development include additional question types, response exports, richer form analytics, and more customization options.

## Author

**Alfaaz Ahmed**

- GitHub: [@alfaazahmed7](https://github.com/alfaazahmed7)
- LinkedIn: [alfaazahmed7](https://linkedin.com/in/alfaazahmed7)
- Portfolio: [alfaazdev.vercel.app](https://alfaazdev.vercel.app)

---

Built with Next.js, TypeScript, and PostgreSQL.