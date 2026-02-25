## Getting Started

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact Form Setup

The contact form posts to `/api/contact` and sends email through Resend.

Set these environment variables in `.env.local` and in Vercel project settings:

```bash
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello@helloship.ai
CONTACT_FROM_EMAIL=Helloship Contact <onboarding@resend.dev>
```

`CONTACT_FROM_EMAIL` is optional. If you switch it to your own domain, verify that sender domain in Resend first.

## Deploy

Deploy with Vercel:

```bash
vercel --prod
```

Or connect the GitHub repo in Vercel and push to deploy.
