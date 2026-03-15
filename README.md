# Frame-Gen

<p align="center">
  <img src="./demo.gif" alt="Frame-Gen Demo" width="700">
</p>

<p align="center">
  <strong>AI-Powered Thumbnail Generator for Content Creators</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#usage">Usage</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#license">License</a>
</p>

---

## Overview

Frame-Gen is a full-stack web application powered by **Next.js 16** and Google's Gemini AI. It enables content creators to generate professional-looking thumbnails by simply entering a title and selecting from curated styles and palettes.

## Features

- 🎨 **AI-Powered Generation** — Create professional thumbnails using Google Gemini AI
- ⚡ **Next.js Speed** — Optimized performance and SEO with Next.js 16
- 🖼️ **Multiple Styles** — Bold & Graphic, Minimalist, Cinematic, and more
- 📐 **Aspect Ratio Options** — Support for 16:9, 1:1, 4:3, and more
- 🎭 **Curated Palettes** — Professional color schemes for every niche
- 🔐 **Secure Auth** — Google OAuth 2.0 and robust session management
- 🛡️ **Security First** — Rate limiting and Helmet.js protection on the backend
- 💾 **Save & Manage** — Access and re-download your collection anytime
- 📱 **Responsive Design** — Beautifully crafted UI that works on all devices

## Tech Stack

### Frontend

| Technology                                                                                                            | Name             | Purpose                                        |
| :-------------------------------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)            | Next.js 16       | Modern React framework for SSR & SEO           |
| ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)                     | React 19         | UI library for building components             |
| ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  | Tailwind CSS 4   | High-performance utility CSS                   |
| ![Framer Motion](https://img.shields.io/badge/Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)        | Framer Motion 12 | Fluid animations and transitions               |
| ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=shadcnui&logoColor=white)          | Shadcn UI        | Modern, accessible component library           |

### Backend

| Technology                                                                                                            | Name             | Purpose                                     |
| :-------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------------------------- |
| ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)              | Express 5        | Web server framework for REST APIs          |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)              | MongoDB          | Scalable NoSQL database                     |
| ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) | Google Gemini AI | Advanced image & prompt generation          |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)     | TypeScript       | Static typing for reliability               |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)       | Cloudinary       | Distributed image storage & CDN             |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (Atlas or Local)
- Google Cloud Console project (for OAuth)
- Cloudinary account
- Google AI Studio API key (for Gemini)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/0dux/frame-gen.git
   cd frame-gen
   ```

2. **Install dependencies**
   ```bash
   # Server
   cd server && npm install

   # Client
   cd ../client && npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run development servers**
   ```bash
   # Terminal 1: Backend
   cd server && npm run server

   # Terminal 2: Frontend
   cd client && npm run dev
   ```

## Environment Variables

### Server (`/server/.env`)
```env
MONGODB_URI=mongodb://localhost:27017/frame-gen
SESSION_SECRET=your-session-secret

GEMINI_API_KEY=your-gemini-key
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

GOOGLE_OAUTH_CLIENT_ID=your-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-client-secret
GOOGLE_OAUTH_REDIRECT_URL=http://localhost:4040/api/v1/business/auth/google/callback

CLIENT_URL=http://localhost:3000
PORT=4040
```

## Usage

1. **Sign in** with your Google account
2. **Navigate** to the Generate page
3. **Enter** your video title
4. **Select** your preferred style, aspect ratio, and color scheme
5. **Add** any additional details or prompts (optional)
6. **Click Generate** and wait for your AI thumbnail
7. **Download** or save to your collection

## Project Structure

### Workspace Layout
```mermaid
graph TD
    Root[frame-gen] --> Client[client - Next.js]
    Root --> Server[server - Express]
    
    Client --> AppDir[app/ - App Router]
    Client --> CompDir[components/ - UI Components]
    Client --> LibDir[lib/ - Utils & Helpers]
    
    Server --> SrcDir[src/]
    SrcDir --> Routes[routes/ - API Routing]
    SrcDir --> Controllers[controllers/ - Business Logic]
    SrcDir --> Models[models/ - DB Schemas]
```

### Key Directories
- **`client/app/`**: Contains the core logic for the Next.js App Router.
    - `auth/`: Handle user login and registration flows.
    - `generate/`: The primary workspace for AI thumbnail creation.
    - `my-generations/`: Restricted area for users to manage their saved designs.
    - `community/`: Public gallery to browse and download shared thumbnails.
    - `context/`: Authentication and theme state management.
    - `landing/`: Modular sections for the high-conversion landing page.
- **`server/src/`**: Houses the backend architecture.
    - `routes/`: Express routers organized by resource.
    - `controllers/`: High-level logic for handling requests and AI integration.
    - `middlewares/`: Security checks, authentication guards, and rate limiting.

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/api/v1/auth/register` | Create a new account | ❌ |
| POST | `/api/v1/auth/login` | Email/Password login | ❌ |
| POST | `/api/v1/auth/logout` | Clear session cookie | ✅ |
| GET | `/api/v1/auth/verify` | Validate current session | ✅ |

### Google OAuth
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/api/v1/googleOAuth/login` | Start Google OAuth flow | ❌ |
| GET | `/api/v1/googleOAuth/callback` | OAuth redirect handler | ❌ |

### Thumbnails
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| POST | `/api/v1/thumbnail/generate` | Generate AI thumbnail | ✅ |
| DELETE | `/api/v1/thumbnail/delete/:id` | Remove a thumbnail | ✅ |
| PATCH | `/api/v1/thumbnail/toggle-published/:id` | Share/Unshare with community | ✅ |
| GET | `/api/v1/thumbnail/community` | Fetch public gallery | ❌ |
| GET | `/api/v1/thumbnail/download-proxy` | Secure download handler | ✅ |

### User Profile
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| GET | `/api/v1/user/thumbnails` | Get all user thumbnails | ✅ |
| GET | `/api/v1/user/thumbnail/:id` | Get specific metadata | ✅ |
| GET | `/api/v1/user/credits` | Check remaining AI credits | ✅ |

## Deployment

Configured for seamless deployment on **Vercel**.
- Client: Next.js optimized
- Server: Express serverless functions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/yourusername">Daksh Yadav</a>
</p>
