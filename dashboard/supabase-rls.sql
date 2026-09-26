-- Car Care Feedback Dashboard v3.0 security policy
-- Run in Supabase > SQL Editor after creating your manager user(s).

alter table public."Feedback_log" enable row level security;

revoke all on table public."Feedback_log" from anon;
revoke all on table public."Feedback_log" from authenticated;
grant select on table public."Feedback_log" to authenticated;
grant update ("Approved", "Approved At", "Approved By") on table public."Feedback_log" to authenticated;

drop policy if exists "Managers can read feedback" on public."Feedback_log";
drop policy if exists "Managers can approve feedback" on public."Feedback_log";

create policy "Managers can read feedback"
on public."Feedback_log"
for select
to authenticated
using (true);

create policy "Managers can approve feedback"
on public."Feedback_log"
for update
to authenticated
using (true)
with check (true);
