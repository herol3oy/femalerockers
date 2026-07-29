# Registration invitations

Registration invitations are isolated under `lib/invitations`, with route UI
under `/admin/invitations` and `/invite`. The legacy waitlist tables are
retained as unused data, and completed inviter attribution is copied to
`referrals_table` when onboarding succeeds.

## Configuration

- `INVITATION_ISSUING_ENABLED=true` controls invitation navigation, pages,
  sends, and revocation actions.
- `INVITATION_REDEMPTION_ENABLED=true` controls signup-link validation and
  invitation-backed onboarding.
- `INVITATION_EXPIRY_DAYS=7` controls link lifetime. Invalid values fall back
  to seven days; accepted values are 1–30.

The two feature flags default to enabled when unset so deploying the feature
before adding environment values does not pause it accidentally. Set them
explicitly in deployed environments.

## Staged shutdown

1. Set `INVITATION_ISSUING_ENABLED=false`. This hides issuing navigation and
   forms and makes direct send/revoke action calls fail.
2. Keep `INVITATION_REDEMPTION_ENABLED=true` for at least the configured
   expiration window so outstanding links can finish onboarding.
3. Set `INVITATION_REDEMPTION_ENABLED=false`. Signup links show an unavailable
   message and onboarding revalidation refuses completion.
4. In a later change, optionally export audit records, then remove the
   invitation routes, UI, `lib/invitations`, email adapter, flags, and table.
   Generate the table-removal migration with `npm run db:generate`; never edit
   generated migration files manually.

Accepted referral relationships remain in `referrals_table` after the
invitation table is removed.
