# Deployment Guide for Taskify

Your production build is ready! Choose one of the deployment options below:

## Option 1: Deploy to Vercel (Recommended) ⭐

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? **taskify** (or your preferred name)
- In which directory is your code located? **./**
- Want to override the settings? **N**

### Step 4: Production Deployment
```bash
vercel --prod
```

Your site will be live at: `https://taskify-xxx.vercel.app`

---

## Option 2: Deploy to Netlify

### Option A: Using Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Deploy**
```bash
netlify deploy
```

4. **Production Deploy**
```bash
netlify deploy --prod
```

### Option B: Using Netlify Web Interface

1. Go to [Netlify](https://www.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click "Deploy site"

---

## Option 3: Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts**:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. **Update vite.config.ts**:
```typescript
export default defineConfig({
  base: '/AYURVAIDYA-2.0/',
  // ... rest of config
})
```

4. **Deploy**:
```bash
npm run deploy
```

---

## Environment Variables Setup

### For Vercel:
```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# ... add all environment variables
```

Or use the Vercel dashboard: Project Settings → Environment Variables

### For Netlify:
Site Settings → Build & Deploy → Environment Variables

Add these variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Custom Domain Setup

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update your domain's DNS records as instructed

### Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Follow DNS configuration instructions

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication (login/register)
- [ ] Test job listings and filtering
- [ ] Test contact form submission
- [ ] Test refer & earn feature
- [ ] Check Firebase/Supabase connections
- [ ] Test on mobile devices
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Configure SEO meta tags
- [ ] Set up monitoring (Sentry, LogRocket, etc.)

---

## Troubleshooting

### Build Fails
- Check Node version (use Node 18+)
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### 404 on Refresh
- Make sure rewrites/redirects are configured (already done in vercel.json/netlify.toml)

### Environment Variables Not Working
- Prefix all variables with `VITE_`
- Restart dev server after adding new variables
- Rebuild after changing production environment variables

---

## Quick Commands Reference

```bash
# Build for production
npm run build

# Preview production build locally
npm run start

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

## Your Site is Built! ✨

The `dist` folder contains your production-ready files.
Choose a deployment method above and make your site live in minutes!

**Recommended**: Use Vercel for the best React/Vite experience with automatic deployments.
