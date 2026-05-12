# Ageless Skin Consult — Production Setup Guide

This guide walks you from a fresh zip to a fully deployed, production-ready website.
The stack is a pnpm monorepo: React/Vite frontend + Express 5 API + Drizzle ORM + Supabase.

---

## 1. Prerequisites

- **Node.js 24+** — [download](https://nodejs.org)
- **pnpm 9+** — `npm install -g pnpm`
- **A Supabase project** — [create one free](https://supabase.com)

---

## 2. Supabase Project Setup

### 2.1 Create a project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Choose a region close to your users
3. Save your **database password** — you'll need it once

### 2.2 Get your credentials
In your Supabase Dashboard → **Settings → API**:
- **Project URL** → `SUPABASE_URL` / `VITE_SUPABASE_URL`
- **anon / public key** → `SUPABASE_ANON_KEY` / `VITE_SUPABASE_ANON_KEY`
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ keep secret, server only

In **Settings → Database → Connection string (URI)**:
- Use the **Transaction mode** pooler (port 6543) for `DATABASE_URL` in production
- Use the **Direct connection** (port 5432) when running `drizzle-kit push`

### 2.3 Enable Google OAuth (optional but recommended)
1. Dashboard → **Authentication → Providers → Google**
2. Toggle on. Follow the [Supabase Google OAuth guide](https://supabase.com/docs/guides/auth/social-login/auth-google) to create a Google Cloud OAuth app.
3. Paste your Google Client ID and Secret into Supabase.
4. Add your site URL to **Authentication → URL Configuration → Redirect URLs**:
   ```
   http://localhost:5173/auth/callback
   https://yourproductiondomain.com/auth/callback
   ```

### 2.4 Configure email confirmations
1. **Authentication → Email Templates** — customise the brand name/colours
2. **Authentication → URL Configuration** → set **Site URL** to your production domain

---

## 3. Local Development

```bash
# Clone / unzip the project
cd Ageless-Skin-Consult

# Install all workspace dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env — fill in your Supabase values (see Section 2.2)

# Push the database schema to Supabase
# (uses the direct connection URL, port 5432)
pnpm --filter @workspace/db run push

# Run the SQL setup script (triggers, RLS policies)
# Open Supabase Dashboard → SQL Editor → paste and run supabase/setup.sql

# Start the API server
pnpm --filter @workspace/api-server run dev

# Start the frontend (in a separate terminal)
pnpm --filter @workspace/skincare-site run dev
```

The frontend will be at http://localhost:5173 and the API at http://localhost:3001.

---

## 4. Database Schema

After `pnpm run push`, your Supabase database will have:

| Table | Description |
|---|---|
| `profiles` | One row per user, auto-created by trigger on sign-up |
| `consultations` | Patient intake assessments |

To add more tables:
1. Add them to `lib/db/src/schema/index.ts`
2. Run `pnpm --filter @workspace/db run push`
3. Add RLS policies in the SQL editor if using the Supabase JS client directly

---

## 5. Auth Flow

```
User signs up → Supabase sends confirmation email
User confirms → Supabase creates auth.users row
                → DB trigger creates profiles row
User redirected to /auth/callback
                → Session established
                → Redirected to /dashboard

User makes API request → sends Authorization: Bearer <access_token>
API middleware         → verifyToken() via supabaseAdmin.auth.getUser()
                       → attaches req.user
Route handler          → uses req.user.id for DB queries
```

**No cookies, no session management** — Supabase handles token refresh automatically in the browser.

---

## 6. Adding New API Endpoints

1. Create a route file in `artifacts/api-server/src/routes/your-feature.ts`
2. Import `requireAuth` from `../middlewares/auth`
3. Register it in `artifacts/api-server/src/routes/index.ts`
4. (Optional) Add the endpoint to `lib/api-spec/openapi.yaml`
5. Run `pnpm --filter @workspace/api-spec run codegen` to regenerate the React hooks

---

## 7. Production Deployment

### Frontend → Vercel / Netlify

```bash
# Build the frontend
pnpm --filter @workspace/skincare-site run build
# Output is in artifacts/skincare-site/dist/
```

Set these environment variables in your hosting dashboard:
```
VITE_SUPABASE_URL=https://your-ref.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
VITE_API_URL=https://your-api.yourdomain.com
```

For Vercel: add a `vercel.json` in `artifacts/skincare-site/`:
```json
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
```

### API Server → Railway / Render / Fly.io

```bash
# Build the API
pnpm --filter @workspace/api-server run build
# Output is in artifacts/api-server/dist/
```

Start command: `node artifacts/api-server/dist/index.mjs`

Set these environment variables:
```
PORT=3001
NODE_ENV=production
DATABASE_URL=<transaction pooler URL, port 6543>
SUPABASE_URL=https://your-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service role key>
ALLOWED_ORIGINS=https://yourfrontenddomain.com
```

---

## 8. Security Checklist

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is **only** set server-side, never in frontend env
- [ ] `VITE_SUPABASE_ANON_KEY` only has anon permissions (confirmed by default)
- [ ] RLS is enabled on all tables (confirmed by `supabase/setup.sql`)
- [ ] `ALLOWED_ORIGINS` is set to your production domain (not `*`)
- [ ] `NODE_ENV=production` on your API server (enables HSTS)
- [ ] Email confirmations are enabled in Supabase Auth settings
- [ ] Password reset redirect URL is set in Supabase Auth → URL Configuration

---

## 9. Key File Map

```
.
├── artifacts/
│   ├── api-server/
│   │   └── src/
│   │       ├── app.ts                    ← Express app, security headers, CORS
│   │       ├── middlewares/auth.ts       ← JWT verification (requireAuth)
│   │       └── routes/
│   │           ├── health.ts
│   │           ├── users.ts              ← GET/PATCH /api/users/me
│   │           └── consultations.ts      ← CRUD /api/consultations
│   └── skincare-site/
│       └── src/
│           ├── lib/supabase.ts           ← Browser Supabase client
│           ├── contexts/auth.tsx         ← AuthProvider + useAuth hook
│           ├── pages/
│           │   ├── login.tsx
│           │   ├── signup.tsx
│           │   ├── forgot-password.tsx
│           │   ├── auth-callback.tsx     ← OAuth/email confirm landing
│           │   ├── dashboard.tsx         ← Protected patient dashboard
│           │   └── home.tsx              ← Public marketing page
│           └── components/layout/navbar.tsx  ← Auth-aware navbar
├── lib/
│   ├── supabase/
│   │   └── src/
│   │       ├── client.ts                 ← Browser client factory
│   │       └── server.ts                 ← Admin client + verifyToken()
│   └── db/
│       └── src/schema/index.ts           ← profiles + consultations tables
├── supabase/
│   └── setup.sql                         ← Triggers, RLS policies
└── .env.example                          ← Environment variable template
```
