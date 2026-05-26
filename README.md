# Eternal Vows — Luxury Digital Wedding Invitation Platform

A premium, cinematic digital wedding invitation platform built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

## ✨ Features

- **Luxury Landing Page** — Cinematic hero, parallax, animated particles
- **Personalized Invitations** — `/invite/[guest-name]` dynamic URLs
- **Couple Section** — Elegant profiles with photos and bios
- **Love Story Timeline** — Interactive animated timeline
- **Wedding Events** — Akad & Resepsi with maps integration
- **Cinematic Gallery** — Masonry layout with lightbox
- **RSVP System** — Elegant form with real-time save
- **Wedding Wishes** — Live guestbook with infinite scroll
- **Digital Gift** — Bank transfer, e-wallet with copy button
- **Music Player** — Floating ambient player
- **Share Invitation** — WhatsApp & native share
- **Admin Dashboard** — Premium SaaS-quality analytics panel
- **Floating Petals** — Cinematic petal animation
- **Loading Screen** — Luxury branded loading experience

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📄 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/invite/[slug]` | Personalized invitation (e.g. `/invite/amara-rafi`) |
| `/admin` | Admin dashboard |
| `/api/rsvp` | RSVP API endpoint |
| `/api/wishes` | Wishes API endpoint |
| `/api/invitations/[slug]` | Invitation data API |

## 🎨 Design System

- **Colors**: Matte Black, Champagne Gold, Rose Gold, Ivory
- **Fonts**: Cormorant Garamond (display), Playfair Display (heading), Poppins (body)
- **Animations**: Framer Motion — cinematic, smooth, luxury feel
- **CSS**: Tailwind CSS v4 with custom `@theme` tokens

## 🏗️ Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Fonts**: next/font/google

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles + Tailwind v4
│   ├── admin/              # Admin dashboard
│   ├── invite/[slug]/      # Dynamic invitation pages
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── invitation/         # Invitation sections
│   ├── admin/              # Admin components
│   └── landing/            # Landing page components
└── lib/
    ├── types.ts            # TypeScript types
    └── data.ts             # Mock data & helpers
```

## 🔧 Environment Variables

Copy `.env.local` and configure:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 🚢 Deployment

```bash
npm run build
npm run start
```

Deploy to Vercel, Railway, or any Node.js host.

## 📝 Customization

Edit `src/lib/data.ts` to change the couple's data, gallery, wishes, and gift accounts.

For production, replace the in-memory stores in API routes with a real database (Supabase/PostgreSQL recommended).

---

*Crafted with love by Eternal Vows — A luxury wedding experience.*
