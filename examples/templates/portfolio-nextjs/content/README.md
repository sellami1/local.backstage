
# ${{ values.name }}

${{ values.description }}

A developer portfolio generated using the Backstage Software Template.

## Technology Stack

- Next.js
- React
- TypeScript
- Docker
- Docker Compose

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

## Production Build

```bash
npm run build
npm start
```

## Docker Deployment

Build and start the application:

```bash
docker compose up -d --build
```

Check container health:

```bash
docker compose ps
```

Open:

http://localhost:3000

Stop the application:

```bash
docker compose down
```

## Backstage

This component was generated from the `portfolio-nextjs-template` Software Template.

Owner: ${{ values.owner }}
