# HAAB — Premium Sportswear Ecommerce

A production-grade, ecommerce platform built with Next.js 15, Express/TypeScript, and MongoDB Atlas.

## Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 + CVA
- **State:** Zustand (client) + TanStack React Query (server)
- **Forms:** React Hook Form + Zod validation
- **UI:** Radix UI primitives + Lucide icons
- **HTTP:** Axios with refresh-token interceptor
- **Payment:** Razorpay + Stripe integration

### Backend
- **Runtime:** Node.js + Express
- **Language:** TypeScript (strict mode)
- **Database:** MongoDB + Mongoose (with lean queries & compound indexes)
- **Auth:** JWT (access + refresh tokens) with HTTP-only cookies
- **Validation:** Zod schemas
- **File Upload:** Multer + Cloudinary
- **Email:** Nodemailer
- **Security:** Helmet, CORS, rate limiting, mongo-sanitize, XSS protection

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render
- **Database:** MongoDB Atlas
- **Media:** Cloudinary
- **CI/CD:** GitHub Actions
- **Containerization:** Docker + Docker Compose

## Architecture

```
haab-ecommerce/
├── frontend/           # Next.js 15 application
│   ├── src/
│   │   ├── app/        # App Router pages & layouts
│   │   ├── features/   # Feature-based modules
│   │   ├── shared/     # Shared UI & utilities
│   │   ├── lib/        # Axios client & utilities
│   │   ├── providers/  # React context providers
│   │   ├── constants/  # App-wide constants
│   │   └── types/      # Shared TypeScript types
│   └── ...
├── backend/            # Express REST API
│   ├── src/
│   │   ├── features/   # Feature-based modules
│   │   ├── shared/     # Security, monitoring, errors, utils
│   │   ├── config/     # Environment & app config
│   │   ├── middlewares/ # Express middlewares
│   │   ├── routes/     # Route aggregation
│   │   ├── database/   # MongoDB connection
│   │   └── types/      # Shared TypeScript types
│   └── ...
├── docker-compose.yml  # Development/Production containers
└── .github/            # CI/CD workflows
```

### Frontend Architecture (Route Groups)

```
app/
├── layout.tsx              # Root: providers, fonts, SEO
├── (main)/                 # Site pages (Navbar + Footer)
│   ├── page.tsx            # Homepage
│   ├── (auth)/             # Login / Register
│   ├── (shop)/             # Products, Cart, Checkout, Wishlist
│   └── account/            # Orders, Profile, Address, Password
├── admin/                  # Admin dashboard
└── order-success/          # Order confirmation
```

### Backend Architecture (Feature-Based)

```
features/{feature}/
├── routes/         # Express routes (thin)
├── controllers/    # Request/response handling
├── services/       # Business logic
├── repositories/   # Data access layer
├── validations/    # Zod schemas
├── interfaces/     # TypeScript interfaces
└── types/          # Input/output types
```

## Features

### Implemented
- **Authentication:** Register, Login, Logout, Refresh Token, JWT with HTTP-only cookies
- **Product Catalog:** Search, filter, sort, pagination, image gallery, related products
- **Shopping Cart:** Client-side Zustand store with localStorage persistence
- **Wishlist:** Client-side Zustand store with localStorage persistence
- **Checkout:** 3-step flow (Shipping → Payment → Review)
- **Order Management:** Create, history, detail, admin status updates
- **User Profile:** Edit profile, change password, manage addresses
- **Reviews & Ratings:** Create, edit, delete reviews with product rating aggregation
- **Coupon System:** Admin CRUD, checkout validation, percentage/fixed discounts
- **Payment Integration:** Razorpay + Stripe (COD also available)
- **Email Notifications:** Order confirmation, status updates
- **Image Upload:** Cloudinary integration with Multer
- **Admin Dashboard:** Revenue stats, order/product/customer management, analytics
- **SEO:** Dynamic metadata, Open Graph, Twitter Cards, JSON-LD, sitemap.xml

### Security
- Helmet security headers with CSP
- CORS with origin validation
- Rate limiting (global + auth-specific)
- Request body size limits (10kb)
- MongoDB injection protection (mongo-sanitize)
- XSS protection (xss-clean + input sanitization)
- HTTP-only cookies with SameSite/secure flags
- Refresh token rotation
- RBAC (customer/admin roles)
- Zod validation on all inputs
- Audit logging structure

### Performance
- Lean MongoDB queries with projection
- Compound database indexes
- Dynamic imports for heavy components
- Image optimization (AVIF/WebP, lazy loading)
- Route-based code splitting
- Font optimization (next/font with swap)

## Getting Started

### Prerequisites
- Node.js 20+
- npm 11+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- (Optional) Razorpay/Stripe account for payments

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd haab-ecommerce

# Install all dependencies (npm workspaces)
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
# Edit the .env files with your credentials

# Start development servers
npm run dev
```

The frontend runs at `http://localhost:3000` and the backend at `http://localhost:5000`.

### Environment Variables

See `backend/.env.example` and `frontend/.env.example` for all required variables.

## Development

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run dev:frontend` | Start frontend only |
| `npm run dev:backend` | Start backend only |
| `npm run build` | Build both for production |
| `npm run lint` | Lint both workspaces |
| `npm run format` | Format all files with Prettier |
| `npm run typecheck` | TypeScript type checking |
| `npm test` | Run all tests |
| `npm run test:backend` | Run backend tests only |
| `npm run test:frontend` | Run frontend tests only |

## Deployment

### Vercel (Frontend)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend`
3. Add environment variables from `frontend/.env.example`
4. Deploy

### Render (Backend)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add all environment variables from `backend/.env.example`

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual services
docker build -t haab-backend ./backend
docker build -t haab-frontend ./frontend
```

### Production Checklist

See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for a complete production readiness checklist.

## API Documentation

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login | No |
| POST | `/api/v1/auth/logout` | Logout | No |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | Cookie |
| GET | `/api/v1/auth/me` | Get current user | JWT |

### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/products` | List products (paginated, filterable) | No |
| GET | `/api/v1/products/:slug` | Get product by slug | No |
| POST | `/api/v1/products` | Create product | Admin |
| PUT | `/api/v1/products/:id` | Update product | Admin |
| DELETE | `/api/v1/products/:id` | Delete product | Admin |

### Categories
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/categories` | List categories | No |
| GET | `/api/v1/categories/:slug` | Get category by slug | No |
| POST | `/api/v1/categories` | Create category | Admin |
| PUT | `/api/v1/categories/:id` | Update category | Admin |
| DELETE | `/api/v1/categories/:id` | Delete category | Admin |

### Orders
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/orders` | Create order | JWT |
| GET | `/api/v1/orders/my-orders` | Get user orders | JWT |
| GET | `/api/v1/orders/:id` | Get order by id | JWT |
| PUT | `/api/v1/orders/:id/status` | Update order status | Admin |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/users/profile` | Get profile | JWT |
| PUT | `/api/v1/users/profile` | Update profile | JWT |
| PUT | `/api/v1/users/password` | Change password | JWT |
| POST | `/api/v1/users/addresses` | Add address | JWT |
| PUT | `/api/v1/users/addresses/:id` | Update address | JWT |
| DELETE | `/api/v1/users/addresses/:id` | Delete address | JWT |

### Reviews
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/reviews/products/:id` | Product reviews | No |
| POST | `/api/v1/reviews` | Create review | JWT |
| PUT | `/api/v1/reviews/:id` | Update review | JWT (owner) |
| DELETE | `/api/v1/reviews/:id` | Delete review | JWT (owner) |

### Coupons
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/coupons/validate` | Validate coupon | JWT |
| GET | `/api/v1/coupons` | List coupons | Admin |
| POST | `/api/v1/coupons` | Create coupon | Admin |
| PUT | `/api/v1/coupons/:id` | Update coupon | Admin |
| DELETE | `/api/v1/coupons/:id` | Delete coupon | Admin |

### Payments
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/payments/create-payment-intent` | Create payment intent | JWT |
| POST | `/api/v1/payments/verify` | Verify payment | JWT |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/admin/dashboard` | Dashboard stats | Admin |
| GET | `/api/v1/admin/customers` | Customer list | Admin |

### Response Format

All API responses follow a consistent format:

```json
// Success
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}

// Paginated
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}

// Error
{
  "success": false,
  "message": "Error description"
}
```

## License

MIT
