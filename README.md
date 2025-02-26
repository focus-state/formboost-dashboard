# Formboost - Dashboard

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment)
for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target)
on your repository and you are good to go.

## API Integration

This project uses [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts)
to generate the API client. To update the API client, run:

```bash
# in the backend repository
just export-schema

# then, in the frontend repository
pnpm run openapi-ts
```
