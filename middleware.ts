import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/journal(.*)',
  '/new-user(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next|^$).*)', // All routes except static assets, internal Next.js files, and home page
    '/(api|trpc)(.*)', // Apply to API and TRPC routes
  ],
}
