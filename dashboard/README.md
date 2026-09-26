# Car Care Feedback Intelligence v3.6

Adds secure Admin user invitations to the existing v3.3 dashboard.

## New in v3.6
- Admin-only **Add User** action in User Management.
- Server-only Next.js route at `/api/admin/users`.
- The route validates the caller's Supabase access token and verifies `profiles.role = admin` before using the Supabase Admin API.
- New users receive a Supabase email invitation and get a `profiles` row with the selected Staff, Manager, or Admin role.
- `SUPABASE_SERVICE_ROLE_KEY` is read only on the server and is never exposed through a `NEXT_PUBLIC_` variable.

## Required environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_TABLE=Feedback_log`
- `SUPABASE_SERVICE_ROLE_KEY` (server only; never commit it)

## Supabase note
For invitation links to land on the correct production site, configure your Supabase Authentication URL settings for your Vercel production URL before relying on invitations for real staff onboarding.


## v3.6
Invited users are redirected to `?setup=password` and must create their own password before entering the dashboard. The password is saved through Supabase Auth with `updateUser` and is never stored in `profiles`.


## v3.6 responsive-only update
- Mobile off-canvas navigation with hamburger and backdrop.
- Small-desktop/tablet header and filter wrapping to prevent overlap.
- Responsive cards, panels, tables, drawers, admin screens, and modals.
- No business logic, Supabase, authentication, approval, role, audit, or invitation functionality changed.
