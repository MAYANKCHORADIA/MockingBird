# 🐦 MockingBird

**Mock APIs in Seconds.**

MockingBird is a lightweight, modern web application that allows frontend developers to instantly provision dynamic HTTP mock endpoints. Test your application's edge cases, simulate network latency, and return custom JSON payloads without writing a single line of backend code.

## ✨ Features

- **Instant Provisioning**: Generate a live, unique URL instantly.
- **Custom Payloads**: Return any valid JSON structure, array, or simple text.
- **Network Latency Simulation**: Inject artificial delays (up to 10 seconds) to test loading states and timeouts.
- **Custom HTTP Statuses**: Return `200 OK`, `400 Bad Request`, `500 Internal Server Error`, and more to test error handling.
- **No Rate Limits**: 100% free to use locally with no annoying paywalls.
- **Beautiful UI**: Built with Next.js, Tailwind CSS, and stunning glassmorphism design.

## 🛠 Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: PostgreSQL (via [Prisma Postgres](https://www.prisma.io/postgres))
- **ORM**: [Prisma 7](https://www.prisma.io/)

## 🚀 Getting Started (Local Development)

Because MockingBird uses Prisma 7's local development environment, you need to run two separate terminals to keep the application and the local database running simultaneously.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Database
In your **first terminal**, start the Prisma Postgres local development server. This spins up a local PostgreSQL instance on port 51214.
```bash
npx prisma dev
```
*(Leave this terminal running in the background!)*

### 3. Sync the Schema
Open a **second terminal** and push the database schema to the newly created local database:
```bash
npx prisma db push
```

### 4. Start the Application
In the same second terminal, start the Next.js development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 💡 How it Works

1. Navigate to `/create` to configure your endpoint.
2. Enter your desired JSON response body, HTTP status code, and optional latency.
3. Click "Generate Live Mock URL".
4. Copy the generated URL (e.g., `http://localhost:3000/api/mock/abc123xy`).
5. Send a `GET` request to that URL from your frontend code or Postman!
