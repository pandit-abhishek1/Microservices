### Shared Services

---
A **shared library of services and utilities** for Node.js/TypeScript projects. This package centralizes commonly used modules (helpers, API wrappers, middlewares, etc.) so they can be reused across multiple applications without duplication.

---
---
### 🔑 Core Modules

* **Cloudinary Upload Service** (`src/cloudinary.upload.ts`)
* **HTTP Gateway Middleware** (`src/gateway.middleware.ts`)
* **Centralized Error Handler** (`src/error.handler.ts`)
* **Logging Utility** (`src/logger.ts`)
* **Miscellaneous Helpers** (`src/helpers.ts`)
---

---

* **Cloudinary Upload Service** (`upload`)
* **Auth Service** (tenant authentication, JWT helpers)
* **Logger Utility** (standardized logging across apps)
* **Error Handler Middleware** (centralized error formatting)
* **Mail Service** (send mails with attachments / PDFs)( upcoming)
* **PDF Generator** (HTML → PDF via Puppeteer) (upcomming)
* **Validation Utilities** (schemas & request validation) 
* **Common Helpers** (date/time, string, number utilities)

---
## 🚀 Installation

```bash
# Using npm
npm install @pandit-abhishek1/sharedservices

# Using yarn
yarn add @pandit-abhishek1/sharedservices

# Using pnpm
pnpm add @pandit-abhishek1/sharedservices
```

---

## 📦 Usage

Import and use the services in your project:

```ts
// Example: Import a helper
import { upload } from '@pandit-abhishek1/sharedservices';

async function main() {
  try {
    const result = await upload('./file.png', 'profile-pic');
    console.log('Uploaded:', result.secure_url);
  } catch (err) {
    console.error('Upload failed:', err);
  }
}
main();
```

---

## 📂 Project Structure

```
01SharedLibraryServices/
│── src/               # Core source code
│   ├── services/      # Shared services
│   ├── utils/         # Utility functions
│   └── index.ts       # Package entry point
│── scripts/           # Build & release scripts
│── package.json       # Package metadata
│── tsconfig.json      # TypeScript configuration
│── .npmrc             # npm registry configuration
```

---

## 🛠 Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/pandit-abhishek1/01SharedLibraryServices.git
cd 01SharedLibraryServices
npm install
```

Build the package:

```bash
npm run build
```

Run tests (if added):

```bash
npm test
```

---

## 📤 Publishing

To publish to GitHub Packages / npm:

```bash
npm run build
npm publish
```

> Make sure you’re logged in with the correct registry (`.npmrc` is already set up for GitHub Packages).

---

## ✅ Features

* Reusable services for Node.js apps
* TypeScript support out-of-the-box
* Centralized error handling & helpers
* Easy to integrate with existing projects

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use it in your projects.

---

