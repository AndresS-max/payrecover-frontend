import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protected routes — both dashboard pages AND API routes require auth
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/export(.*)',
]);

import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, request) => {
  if (isProtectedRoute(request)) {
    const session = await auth();
    if (!session.userId) {
      // Redirigir a la landing page en lugar del portal de Clerk
      // para que usen el modal
      const url = new URL('/', request.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
