# PARS EXIR — Admin Setup Guide

## Creating the First Administrator

This project uses Supabase Auth — there are NO hardcoded credentials.

### Step 1: Set Up Supabase Project

1. Go to https://supabase.com and create a new project.
2. Note your **Project URL** and **anon/public API key**.

### Step 2: Apply Database Migrations

In the Supabase Dashboard → **SQL Editor**, run these files in order:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_seed_data.sql`
3. `supabase/migrations/003_articles_seed.sql`

### Step 3: Create the First Admin User

In the Supabase Dashboard → **Authentication → Users → Invite user**:
1. Enter the admin's email address.
2. The admin will receive an invitation email with a link to set their password.

### Step 4: Grant Admin Profile

After the user registers, run this SQL in the Supabase SQL Editor:

```sql
INSERT INTO public.admin_profiles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'YOUR_ADMIN_EMAIL@example.com';
```

Replace `YOUR_ADMIN_EMAIL@example.com` with the actual admin email.

### Step 5: Configure Environment Variables

Create `.env` in the project root:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

For Cloudflare Pages, add these same variables in:
**Settings → Environment variables → Production**

### Step 6: Deploy to Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Set environment variables as above.

### Admin Panel Access

Once deployed, access the admin panel at:
`https://pars-exir.ir/admin/login`

---

## Security Notes

- **NEVER** put the `service_role` key in the frontend code.
- **NEVER** hardcode credentials in source files.
- The `anon` key is safe to expose — it is protected by RLS policies.
- RLS policies enforce that only users in `admin_profiles` can modify data.
