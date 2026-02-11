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

Frame-Gen is a full-stack web application that leverages Google's Gemini AI to generate eye-catching thumbnails for videos. Simply enter your video title, select a style, aspect ratio, and color scheme — and let AI do the rest. No design skills required!

## Features

- 🎨 **AI-Powered Generation** — Create professional thumbnails using Google Gemini AI
- ⚡ **Fast Iterations** — Generate multiple variations and choose what fits best
- 🖼️ **Multiple Styles** — Bold & Graphic, Minimalist, Cinematic, and more
- 📐 **Aspect Ratio Options** — Support for 16:9, 1:1, 4:3, and other formats
- 🎭 **Color Schemes** — Choose from curated color palettes
- 🔐 **Google OAuth** — Secure authentication with Google
- 💾 **Save & Manage** — Access all your generated thumbnails anytime
- 🌐 **Community Gallery** — Browse and get inspired by community creations
- 📱 **Responsive Design** — Works seamlessly on desktop and mobile

## Tech Stack

### Frontend

|                                                       Technology                                                       | Name          | Purpose                                        |
| :--------------------------------------------------------------------------------------------------------------------: | ------------- | ---------------------------------------------- |
|           ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)           | React 19      | UI library for building interactive components |
|            ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)             | Vite          | Lightning-fast build tool and dev server       |
|  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)  | TailwindCSS   | Utility-first CSS framework for styling        |
|      ![Framer Motion](https://img.shields.io/badge/Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)      | Framer Motion | Smooth animations and transitions              |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white) | React Router  | Client-side routing and navigation             |

### Backend

|                                                        Technology                                                         | Name          | Purpose                                     |
| :-----------------------------------------------------------------------------------------------------------------------: | ------------- | ------------------------------------------- |
|         ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)          | Express 5     | Web server framework for REST APIs          |
|         ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)          | MongoDB       | NoSQL database for storing user data        |
| ![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) | Google Gemini | AI-powered image generation                 |
|     ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)     | Cloudinary    | Image storage, optimization, and CDN        |
|     ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)     | TypeScript    | Type-safe JavaScript development            |
|               ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)                | Zod           | Schema validation for request/response data |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Cloud Console project with OAuth credentials
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
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Run the development servers**

   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm run server

   # Terminal 2 - Start frontend
   cd client
   npm run dev
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000`

## Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/frame-gen

# Session
SESSION_SECRET=your-super-secret-session-key

# Google AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key

# Cloudinary
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Google OAuth
GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH_CLIENT_SECRET=your-google-client-secret
GOOGLE_OAUTH_REDIRECT_URL=http://localhost:3000/api/v1/auth/google/callback

# Optional
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
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

```
frame-gen/
├── client/                 # React frontend
│   ├── src/
│   │   ├── assets/         # Static assets & constants
│   │   ├── components/     # Reusable UI components
│   │   ├── configs/        # API configuration
│   │   ├── context/        # React context (Auth)
│   │   ├── data/           # Static data (features, pricing)
│   │   ├── pages/          # Page components
│   │   └── sections/       # Homepage sections
│   └── public/             # Public assets
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # App configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middlewares/    # Auth & validation
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # API routes
│   └── api/                # Vercel serverless entry
│
└── README.md
```

## API Endpoints

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| POST   | `/api/v1/auth/google`          | Initiate Google OAuth  |
| GET    | `/api/v1/auth/google/callback` | OAuth callback         |
| POST   | `/api/v1/thumbnail/generate`   | Generate new thumbnail |
| GET    | `/api/v1/user/thumbnail/:id`   | Get specific thumbnail |
| GET    | `/api/v1/user/thumbnails`      | Get user's thumbnails  |

## Deployment

Both client and server are configured for **Vercel** deployment:

- `client/vercel.json` — Frontend deployment config
- `server/vercel.json` — Backend serverless config

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
