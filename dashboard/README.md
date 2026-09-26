# Car Care Feedback Dashboard v3.0

Secure manager edition. Adds Supabase Auth login/sign-out, RLS setup, and approval audit logging.

Approval writes:
- `Approved = true`
- `Approved At = current timestamp`
- `Approved By = signed-in manager email` (falls back to Auth user UUID)

## Setup
1. Copy the working `.env.local` from v2.6 into this folder.
2. Run `npm.cmd install`.
3. In Supabase: Authentication > Users > Add user. Create each manager with email/password.
4. In Supabase: SQL Editor. Open `supabase-rls.sql`, paste it, and Run.
5. Run `npm.cmd run dev` and open http://localhost:3000.
6. Sign in with the manager account created in Supabase.

Keep the publishable key in `.env.local`. Never use a secret/service-role key in this browser app.

## v3.1 role-aware UI
This version reads the signed-in user's row from `public.profiles` and displays the assigned role. Only `manager` and `admin` roles are shown approval controls. `staff` can review the dashboard and Attention queue but cannot approve from the UI. Database RLS should still be tightened separately after this version is tested.
