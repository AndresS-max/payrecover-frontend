import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to ALL routes
        source: "/(.*)",
        headers: [
          // ── Clickjacking Protection ──────────────────────────────────
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // ── MIME Sniffing Protection ─────────────────────────────────
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // ── Referrer Policy ─────────────────────────────────────────
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // ── DNS Prefetch (Performance) ──────────────────────────────
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // ── Force HTTPS (HSTS) ─────────────────────────────────────
          // 2 years, include subdomains, allow HSTS preload list
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // ── Permissions Policy ─────────────────────────────────────
          // Disable access to sensitive browser APIs not needed by AlyntAI
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // ── XSS Protection (legacy browsers) ──────────────────────
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // ── Content Security Policy ────────────────────────────────
          // Allows: Clerk (auth UI/JS), Supabase (API), Stripe (checkout),
          // Google Fonts, and Vercel (preview deployments)
          {
            key: "Content-Security-Policy",
            value: [
              // Scripts: self + Clerk (dev & prod) + Stripe
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.alyntai.com https://*.clerk.alyntai.com https://js.stripe.com https://challenges.cloudflare.com",
              // Styles: self + Google Fonts + inline (Clerk injects styles)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://clerk.alyntai.com https://*.clerk.alyntai.com",
              // Images: self + Clerk avatars + data URIs + Stripe
              "img-src 'self' data: blob: https://*.clerk.com https://img.clerk.com https://clerk.alyntai.com https://*.clerk.alyntai.com https://*.stripe.com",
              // Fonts: self + Google Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // API connections: self + Supabase + Backend + Clerk (dev & prod) + Stripe
              "connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://*.clerk.com https://clerk.alyntai.com https://*.clerk.alyntai.com https://api.stripe.com https://alyntai-backend.onrender.com",
              // Frames: Clerk modals (dev & prod) + Stripe checkout + Cloudflare challenges
              "frame-src https://*.clerk.accounts.dev https://clerk.alyntai.com https://*.clerk.alyntai.com https://js.stripe.com https://challenges.cloudflare.com",
              // Workers: self + blob (Next.js uses workers)
              "worker-src 'self' blob:",
              // Block all object/embed
              "object-src 'none'",
              // Base URI restriction
              "base-uri 'self'",
              // Form actions: self + Stripe
              "form-action 'self' https://*.stripe.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
