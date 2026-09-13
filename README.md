# Phintech Creatives

Phintech Creatives is a Next.js portfolio site for a creative technology studio. It presents branding, flyer, letterhead, and logo work alongside the studio's services and contact flow.

## Development

Requirements: Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Create a local environment file for contact delivery:

```bash
cp .env.example .env.local
```

Then set the Resend values in `.env.local`:

```env
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=Phintech Creatives <onboarding@resend.dev>
```

The contact form still works without these values, but enquiries will not be sent by email.

## Scripts

```bash
npm run dev    # Start the development server
npm run build  # Create a production build
npm run start  # Serve the production build
```

## Deploy to Vercel

Import the GitHub repository into Vercel. Vercel detects the Next.js app automatically, so the default build settings are sufficient:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Install command: `npm install`
- Output directory: leave the default

Add these environment variables in the Vercel project settings for Production, Preview, and Development as needed:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=philtech91@gmail.com
CONTACT_FROM_EMAIL=Phintech Creatives <onboarding@resend.dev>
```

For production email delivery, use a `CONTACT_FROM_EMAIL` address on a domain verified in Resend. The local `.env.local` file is ignored and must not be committed.

After deployment, update `https://phintechcreatives.com` in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` if the live domain is different.

## Site structure

- `/` - Studio introduction and featured work
- `/about` - Studio overview
- `/services` - Services offered
- `/work` - Complete categorized portfolio gallery
- `/faq` - Answers to common project questions
- `/contact` - Contact form backed by `app/api/contact/route.ts`
- `/terms` - Terms and conditions
- `/privacy` - Privacy policy

Portfolio imagery is stored in `public/portfolio/`, grouped into `branding`, `flyers`, `letter-head`, and `logos`. Files in `public/` are served from the site root, so an image such as `public/portfolio/logos/LOGO.jpg` is available at `/portfolio/logos/LOGO.jpg`.
