# Feedback Dashboard Frontend

React application for the Feedback Management Dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (optional):
```
VITE_API_URL=http://localhost:5000
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Deployment

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variable `VITE_API_URL` to your backend URL

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable `VITE_API_URL` in Netlify settings

