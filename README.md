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
