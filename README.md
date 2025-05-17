# Mini Social Media Platform - Database Schema & Dev Setup

This document outlines the recommended database setup for a simple social media platform and the development environment using Next.js, Docker, Zustand, and Appwrite.

---

## Database Schema

### Collections

#### 1. Users (`appUsers`)

| Field               | Type     | Description                        |
| ------------------- | -------- | ---------------------------------- |
| `_id`               | ObjectId | Unique user identifier             |
| `username`          | String   | Unique username (indexed)          |
| `email`             | String   | Unique email (indexed)             |
| `passwordHash`      | String   | Hashed user password               |
| `displayName`       | String   | User's display name                |
| `profilePictureUrl` | String   | URL to profile picture             |
| `bio`               | String   | Short user biography               |
| `followersCount`    | Number   | Number of followers (denormalized) |
| `followingCount`    | Number   | Number of users being followed     |
| `status`            | String   | User status (e.g., active, banned) |
| `createdAt`         | Date     | Account creation timestamp         |
| `updatedAt`         | Date     | Last profile update timestamp      |

#### 2. Posts (`appPosts`)

| Field           | Type     | Description                                       |
| --------------- | -------- | ------------------------------------------------- |
| `_id`           | ObjectId | Unique post identifier                            |
| `authorId`      | ObjectId | Reference to `appUsers._id`                       |
| `content`       | String   | Text content of the post                          |
| `mediaUrls`     | Array    | List of image/video URLs                          |
| `likesCount`    | Number   | Number of likes (denormalized)                    |
| `commentsCount` | Number   | Number of comments (denormalized)                 |
| `visibility`    | String   | Post visibility (public, private, followers-only) |
| `createdAt`     | Date     | Post creation timestamp                           |
| `updatedAt`     | Date     | Post last update timestamp                        |

#### 3. Comments (`appComments`)

| Field        | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `_id`        | ObjectId | Unique comment identifier     |
| `postId`     | ObjectId | Reference to `appPosts._id`   |
| `authorId`   | ObjectId | Reference to `appUsers._id`   |
| `content`    | String   | Text content of the comment   |
| `likesCount` | Number   | Number of likes (optional)    |
| `createdAt`  | Date     | Comment creation timestamp    |
| `updatedAt`  | Date     | Comment last update timestamp |

#### 4. Likes (`appLikes`)

| Field        | Type     | Description                                      |
| ------------ | -------- | ------------------------------------------------ |
| `_id`        | ObjectId | Unique like identifier                           |
| `userId`     | ObjectId | Reference to `appUsers._id`                      |
| `targetType` | String   | `"post"` or `"comment"`                          |
| `targetId`   | ObjectId | Reference to `appPosts._id` or `appComments._id` |
| `createdAt`  | Date     | Timestamp when like was made                     |

#### 5. Follows (`appFollows`)

| Field         | Type     | Description                          |
| ------------- | -------- | ------------------------------------ |
| `_id`         | ObjectId | Unique follow relationship ID        |
| `followerId`  | ObjectId | User who follows (`appUsers._id`)    |
| `followingId` | ObjectId | User being followed (`appUsers._id`) |
| `createdAt`   | Date     | Timestamp when follow started        |

#### 6. Notifications (`appNotifications`) _(Optional)_

| Field       | Type     | Description                               |
| ----------- | -------- | ----------------------------------------- |
| `_id`       | ObjectId | Unique notification ID                    |
| `userId`    | ObjectId | User receiving the notification           |
| `type`      | String   | Notification type (like, comment, follow) |
| `relatedId` | ObjectId | Reference to related post/comment/follow  |
| `isRead`    | Boolean  | Whether notification is read              |
| `createdAt` | Date     | Notification creation timestamp           |

---

## Relationships Overview

- Users ⇨ Posts: one-to-many
- Posts ⇨ Comments: one-to-many
- Users ⇨ Comments: one-to-many
- Users ⇄ Users (Follows): many-to-many
- Users ⇨ Likes: polymorphic (posts or comments)
- Users ⇨ Notifications: one-to-many (optional)

---

## Best Practices

- Use **camelCase** for collections and fields (e.g., `appUsers`, `authorId`).
- Add **timestamps** to track creation and updates.
- Index frequently queried fields (`username`, `email`, `authorId`).
- Denormalize counts (`likesCount`, `commentsCount`) for performance.
- Securely hash passwords.
- Use polymorphic references for likes.
- Paginate posts and comments to handle large datasets.
- Design for scalability and maintainability.

---

## Development Setup

### This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

Start editing by modifying `app/page.tsx`. Changes auto-update in the browser.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load [Geist](https://vercel.com/font), a font by Vercel.

### Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js Interactive Tutorial](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### Deploy on Vercel

Deploy easily using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

More details: [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## Docker Setup

Docker allows packaging the app and its dependencies into a container to run consistently anywhere.

### Docker Commands

- Build the Docker image:

  ```bash
  npm run docker-build
  ```

- Run the Docker container (maps port 3000):

  ```bash
  npm run docker-run
  ```

- Stop the Docker container:

  ```bash
  npm run docker-stop
  ```

---

## Key Dependencies

### Zustand

A lightweight React state management library used for managing global and local state with minimal boilerplate and great performance.

- Ideal for managing UI state like modals, user session, post feeds, etc.
- Uses hooks and a simple API for creating stores.

### Appwrite

An open-source backend-as-a-service (BaaS) platform that provides ready-to-use APIs for authentication, database, storage, and more.

- Simplifies backend development for auth, file uploads, realtime data, etc.
- Can replace or complement your own backend/database.

---

## Package.json (Partial)

```json
{
  "name": "najmti",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "docker-build": "docker build -t docker-najmti .",
    "docker-run": "docker run -p 3000:3000 -v $(pwd):/src -v /src/node_modules docker-najmti",
    "docker-stop": "docker stop docker-najmti"
  },
  "dependencies": {
    "appwrite": "^17.0.2",
    "immer": "^10.1.1",
    "motion": "^12.11.3",
    "next": "15.3.2",
    "ogl": "^1.0.11",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.2",
    "sass": "^1.89.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```
