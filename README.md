# Tariq Khan — Developer Portfolio

A personal portfolio site where I list my projects. Visitors can browse the
project list without an account; I (the owner) can register and log in
right on the homepage to unlock a private dashboard where I add, edit, and
delete projects — changes show up on the live site immediately because
they're read from a real database.

**Live site:** _add your deployed Netlify URL here_
**Demo video:** _add your unlisted YouTube link here_

## What it does

- Public homepage — hero, about, a project grid pulled live from a
  Supabase database, skills, and a contact form.
- A "Client Portal" section with side-by-side login and register cards,
  wired to Supabase Auth (register, log in, log out, password reset).
- A `/admin` dashboard, visible only when logged in, with full CRUD
  (create, read, update, delete) on the `projects` table.
- Row Level Security in the database so only the authenticated owner can
  write data — everyone can read it.

## Technologies used

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) for client-side routes
- [Supabase](https://supabase.com/) for the Postgres database and
  authentication
- Deployed on [Netlify](https://www.netlify.com/)

## Project structure

```
src/
  components/   Navbar, ProjectCard, ProjectForm
  context/      AuthContext (wraps Supabase auth state)
  lib/          supabaseClient.js
  pages/        Home.jsx (includes the login/register cards), Admin.jsx
supabase/
  schema.sql    Table + Row Level Security policies to run in Supabase
```

## Setup instructions

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com), sign in, and create a new
   project (free tier).
2. In the Supabase dashboard, open **SQL Editor → New query**, paste the
   contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it.
   This creates the `projects` table and the security policies that let
   anyone read projects but only the logged-in owner write them.
3. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon public** key.
4. In this repo, copy `.env.example` to `.env` and paste those two values in:

   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```

   `.env` is git-ignored, so your keys won't be committed.

5. (Optional, recommended for a class demo) In **Authentication → Providers
   → Email**, turn off "Confirm email" so you can register and log
   straight in without waiting on a confirmation email while recording
   your demo video.

### 2. Run it locally

```bash
npm install
npm run dev
```

Open the printed local URL. Click **Owner login** in the nav to register
your one owner account, then visit `/admin` to add projects.

### 3. Deploy to Netlify

1. Push this repo to GitHub (public).
2. In Netlify: **Add new site → Import an existing project**, pick this
   repo.
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Under **Site settings → Environment variables**, add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the same values
   from your `.env`.
5. Deploy. The `public/_redirects` file already tells Netlify to route all
   paths to `index.html` so `/admin` and `/login` work on refresh.

6. Website link (https://portfoli-khan-netlify.netlify.app/)

## Notes

- The homepage content (name, role, about text, skills, email/social
  links) is placeholder copy in `src/pages/Home.jsx` — edit it to match
  you before recording the demo.
- The contact form posts to Formspree (`src/pages/Home.jsx`, the
  `contact-form`). Create a free form at
  [formspree.io](https://formspree.io) and swap `YOUR_FORM_ID` in the
  `action` URL, or remove the form if you don't need it working.
- Anyone who registers through the "Create Account" card can log in and
  manage projects from `/admin`; for a real multi-user app you'd restrict
  registration further, but for a personal portfolio this is intentional
  and simple.
- "Forgot password?" on the login card sends a real Supabase password
  reset email — make sure the redirect URL in Supabase's Auth settings
  matches where the app is deployed.
  
  ## You Tube Video link (Portfolio)
  https://youtu.be/-ZLo_vEH4WQ
  
  

