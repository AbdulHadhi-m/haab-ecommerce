# Deployment Guide

## Overview

This guide covers deploying the ADIWEAR ecommerce platform to production.

### Infrastructure
- **Frontend:** Vercel (Serverless Next.js)
- **Backend:** Render (Web Service)
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary
- **Domain:** Your custom domain

## Prerequisites

### Accounts Needed
1. **Vercel** — [vercel.com](https://vercel.com) (sign up with GitHub)
2. **Render** — [render.com](https://render.com) (sign up with GitHub)
3. **MongoDB Atlas** — [mongodb.com/atlas](https://mongodb.com/atlas)
4. **Cloudinary** — [cloudinary.com](https://cloudinary.com)
5. **GitHub** — [github.com](https://github.com)

### Optional Accounts
- Razorpay (for Indian payments)
- Stripe (for international payments)
- SMTP provider (SendGrid, Mailgun, etc.)

## Step 1: Database Setup (MongoDB Atlas)

1. Create a free M0 cluster (upgrade to M10+ for production)
2. Set up database user with strong password
3. Configure network access (IP whitelist or VPC peering)
4. Get your connection string:
   ```
   mongodb+srv://<user>:<password>@cluster.mongodb.net/haab?retryWrites=true&w=majority
   ```

## Step 2: Media Storage (Cloudinary)

1. Create a Cloudinary account
2. Note your Cloud Name, API Key, and API Secret
3. (Optional) Create an unsigned upload preset for client-side uploads

## Step 3: Backend Deployment (Render)

### Create Web Service

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `haab-backend`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Starter (or higher for production)

### Environment Variables

Add all variables from `backend/.env.example`:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `CORS_ORIGIN` | `https://your-frontend-domain.vercel.app` |
| `JWT_ACCESS_SECRET` | Generate a random 64-char string |
| `JWT_REFRESH_SECRET` | Generate a different random 64-char string |
| `CLOUDINARY_CLOUD_NAME` | From Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | From Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | From Cloudinary dashboard |
| `RAZORPAY_KEY_ID` | (Optional) From Razorpay dashboard |
| `RAZORPAY_KEY_SECRET` | (Optional) From Razorpay dashboard |
| `STRIPE_SECRET_KEY` | (Optional) From Stripe dashboard |
| `STRIPE_WEBHOOK_SECRET` | (Optional) From Stripe dashboard |
| `SMTP_HOST` | (Optional) Your SMTP provider host |
| `SMTP_PORT` | (Optional) `587` |
| `SMTP_USER` | (Optional) SMTP username |
| `SMTP_PASS` | (Optional) SMTP password |
| `SMTP_FROM` | (Optional) `noreply@yourdomain.com` |

### Health Check

Render will automatically check the health endpoint at `/api/v1/health`.

## Step 4: Frontend Deployment (Vercel)

### Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** `Next.js`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

### Environment Variables

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://haab-backend.onrender.com/api/v1` |
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.vercel.app` |

### Custom Domain (Optional)

1. Go to your project → "Domains"
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

## Step 5: Post-Deployment

### Verify
1. Visit your frontend URL
2. Register a new account
3. Browse products
4. Place a test order (COD)
5. Test admin login (set role to "admin" in MongoDB directly)

### Configure Monitoring
1. Set up Vercel Analytics for frontend performance
2. Configure Render logging and metrics
3. Set up MongoDB Atlas monitoring alerts

### SEO
1. Submit sitemap to Google Search Console:
   ```
   https://your-domain.com/sitemap.xml
   ```
2. Verify site ownership via DNS or HTML file
3. Monitor indexing status

## Docker Deployment (Alternative)

For containerized deployment:

```bash
# Build and run
docker-compose up --build -d

# Or build individually
docker build -t haab-backend ./backend
docker build -t haab-frontend ./frontend

# Run backend
docker run -d \
  --name haab-backend \
  -p 5000:5000 \
  --env-file ./backend/.env \
  haab-backend

# Run frontend
docker run -d \
  --name haab-frontend \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-backend.com/api/v1 \
  haab-frontend
```

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify all required env vars are set
- Check Render logs for startup errors

### Frontend can't reach backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS_ORIGIN on backend includes the frontend URL
- Ensure backend is running and health endpoint responds

### Images not loading
- Verify Cloudinary credentials
- Check Cloudinary cloud name is correct
- Verify image remote patterns in next.config.ts

### Payment failures
- Verify payment gateway credentials
- Check webhook endpoints are publicly accessible
- Test with test/live mode keys consistently

## Scaling Considerations

### When to Scale
- **MongoDB Atlas:** Upgrade from M0 to M10+ when you need more connections/performance
- **Render:** Upgrade plan for more CPU/RAM, enable auto-scaling
- **Vercel:** Pro plan for faster builds, team collaboration
- **Cloudinary:** Upgrade for more storage and bandwidth

### Performance Optimization
- Enable MongoDB Atlas performance advisor
- Add CDN caching for static assets
- Implement Redis caching for product catalog
- Add database read replicas for high traffic
- Use Vercel Edge Functions for geolocation-based personalization
