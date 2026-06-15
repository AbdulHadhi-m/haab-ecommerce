# Production Readiness Checklist

## Security
- [ ] All environment variables configured in production
- [ ] JWT secrets are strong (32+ characters, random)
- [ ] MongoDB Atlas IP whitelist configured
- [ ] CORS_ORIGIN set to specific frontend domain (not `*`)
- [ ] Helmet CSP directives reviewed for production
- [ ] Rate limiting configured for production (100 req/15min)
- [ ] Auth rate limiting configured (20 req/15min)
- [ ] Request body size limits enforced (10kb)
- [ ] Cloudinary signed uploads configured (if using unsigned, review security)
- [ ] SMTP credentials configured for email notifications
- [ ] Razorpay/Stripe webhook secrets configured
- [ ] Refresh token rotation verified
- [ ] HTTP-only cookies with SameSite=Strict in production
- [ ] HSTS preload ready (check helmet config)
- [ ] XSS and NoSQL injection protections active
- [ ] RBAC enforced on all admin/customer routes
- [ ] Audit logging structure in place

## Performance
- [ ] MongoDB indexes created on all collections
- [ ] Lean queries enabled on all read operations
- [ ] Pagination implemented on list endpoints
- [ ] Image optimization (AVIF/WebP) configured
- [ ] Next.js image remote patterns set to specific Cloudinary URLs
- [ ] Dynamic imports for below-fold components
- [ ] Font optimization with next/font (display: swap)
- [ ] Route-based code splitting active
- [ ] Bundle size analyzed (keep First Load JS under 200kB per page)
- [ ] React Server Components used where possible
- [ ] Client components minimized with "use client" boundary

## SEO
- [ ] Metadata defined on all pages
- [ ] Open Graph tags set (title, description, image, url)
- [ ] Twitter cards configured
- [ ] Canonical URLs set
- [ ] robots.txt disallows admin/api/account pages
- [ ] sitemap.xml generated and submitted to Google Search Console
- [ ] JSON-LD structured data (Organization, Website, Product)
- [ ] Google Search Console verified
- [ ] Google Analytics (or alternative) configured
- [ ] 404 page styled and informative

## Testing
- [ ] Backend tests passing (auth, products, orders)
- [ ] Frontend component tests passing
- [ ] API endpoint testing with Postman/Insomnia collection
- [ ] Error scenarios tested (invalid input, auth failures, not found)
- [ ] Payment flow tested (COD + Razorpay/Stripe)
- [ ] Email notifications working in staging
- [ ] Image upload tested
- [ ] Admin CRUD operations tested

## Deployment
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render (or your chosen provider)
- [ ] MongoDB Atlas cluster configured (M10+ recommended for production)
- [ ] Cloudinary account configured with secure upload preset
- [ ] Custom domain configured with SSL
- [ ] DNS records verified
- [ ] Environment variables set in hosting platforms
- [ ] Build commands tested (frontend: next build, backend: tsc)
- [ ] Health check endpoint responding

## Monitoring
- [ ] Structured JSON logging configured
- [ ] Error tracking/log aggregation set up
- [ ] MongoDB Atlas monitoring enabled
- [ ] Uptime monitoring configured (Pingdom, UptimeRobot, etc.)
- [ ] Performance monitoring (Vercel Analytics, Sentry, etc.)
- [ ] Alert notifications configured for critical errors
- [ ] Database backup strategy in place
- [ ] Rate limit monitoring (to detect abuse)

## CI/CD
- [ ] GitHub Actions workflows passing
- [ ] TypeScript type checking in CI
- [ ] Linting in CI
- [ ] Tests running in CI
- [ ] Build verification in CI
- [ ] Automatic deployment on main branch commits

## Legal & Compliance
- [ ] Privacy Policy page created
- [ ] Terms of Service page created
- [ ] Cookie consent banner implemented
- [ ] GDPR/CCPA compliance checked
- [ ] SSL certificate valid and auto-renewing
- [ ] Data retention policy documented

## Post-Launch
- [ ] Load testing performed
- [ ] Lighthouse audit passed (score 90+ on all metrics)
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Payment flow end-to-end tested
- [ ] Order fulfillment process documented
- [ ] Customer support contact established
- [ ] Backup and disaster recovery plan documented
