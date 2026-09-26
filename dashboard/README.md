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

## v3.9 responsive refinement
- Reduced phone header spacing between the page introduction and status/action controls.
- Small desktop widths use an icon-only sidebar rail to prevent navigation label crowding.
- No application functionality or data logic changed.


## v3.9 responsive correction
- Corrects the phone header gap by overriding the inherited small-desktop flex basis.
- Keeps the v3.9 compact icon-only small-desktop sidebar unchanged.
- No application functionality or business logic changed.


## v3.9 responsive correction
- Small desktop/tablet sidebar labels are explicitly wrapped and hidden, leaving a clean icon-only rail.
- Phone drawer restores the full navigation labels.
- No application/business logic changed.

## v3.11 invitation-session safety fix
- Preserves the v3.9 responsive production baseline.
- Includes the server-side invitation authentication fix.
- Password setup is shown only when the active authenticated email matches the invited email encoded by the server in the invitation redirect.
- If another account is already signed in, password setup is blocked and the user is instructed to sign out and reopen the original invitation link.
