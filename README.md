# Cyber-I

Production-oriented Next.js rebuild of the original Cyber-I Vite application.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishing dashboard

The private, single-administrator dashboard is available at `/admin`. It supports database-backed login sessions, email OTP password recovery, drafts, publishing, rich-text editing, featured images, inline images, updates, and deletion. There is intentionally no registration route.

1. Copy `.env.example` to `.env.local` and fill in the MongoDB, administrator, and SMTP values. Set `CONTACT_TO` to the mailbox authorized to receive website enquiries.
2. Set a unique initial administrator password of 12–128 characters. The administrator is created on the first sign-in or recovery request. Once the account exists, remove `ADMIN_INITIAL_PASSWORD` from the runtime environment and use password recovery to change the password.
3. Run `npm run dev` and open [http://localhost:3000/admin](http://localhost:3000/admin).

Password recovery and the enquiry form use the same SMTP configuration. Production requires TLS, either implicit TLS (`SMTP_SECURE=true`) or STARTTLS. Reset codes expire after 10 minutes and can be used once. A successful password reset invalidates existing sessions.

### Image persistence

New uploads are decoded, re-encoded and stored in MongoDB's `blogImages` collection. The public URLs stay under `/uploads/blog/`. Keep any existing files from `public/uploads/blog` in the deployment and include them in backups until those articles are updated. Back up MongoDB, including `blogImages`. Uploaded URLs are public and media can be shared between articles, so deleting an article leaves its images available.

## Production deployment

- Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before `npm run build`. Use the same origin at runtime for admin and enquiry submissions.
- Use a Node.js deployment with MongoDB network access. Use `npm ci`, `npm run build` and `npm run start`. For a pnpm deployment use `pnpm install --frozen-lockfile` and the equivalent build and start commands.
- When the ingress overwrites a header with one verified client IP, set `TRUSTED_CLIENT_IP_HEADER` to its name. Without a trusted header, visitors share the IP rate-limit bucket.
- Sample blog posts are hidden by default. `SHOW_DEMO_BLOGS=true` enables samples for staging.
- Before launch, supply the approved privacy and terms copy and replace or remove the staged testimonials, imagery, and relationship claims identified in the public copy.

Run `npm run lint` and `npm test` for lint and Chromium regression tests. Install Chromium with `npx playwright install chromium` if needed. Set `PLAYWRIGHT_BASE_URL` to run the tests against a running build.

## Structure

- `src/app` — App Router entry points, metadata, and global styles.
- `src/components/layout` — global site frame, navigation, and footer.
- `src/components/sections` — one discoverable component per homepage section.
- `src/components/interactive` — intentionally narrow client components.
- `src/components/ui` — reusable visual primitives.
- `src/data` — site copy and repeated content rendered from arrays.
- `src/types` — shared domain types.
