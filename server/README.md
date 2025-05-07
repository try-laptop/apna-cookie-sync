# Apna College Cookie Sync Server

A server application that allows sharing cookies between devices for Apna College websites.

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

- `GET /api/status` - Check server status and last cookie update time
- `POST /api/cookies/upload` - Upload cookies to the server
- `GET /api/cookies/latest` - Download the latest cookie data

## Deployment to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - **Name**: apna-cookie-sync
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
4. Add the environment variable:
   - `MONGODB_URI=mongodb+srv://trylaptop2024:trylaptop2024@cookies.m2qyhmn.mongodb.net/?retryWrites=true&w=majority&appName=cookies`
5. Click "Create Web Service"
