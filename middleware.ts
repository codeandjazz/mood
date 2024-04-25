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
    '/((?!.+\\.[\\w]+$|_next).*)', // All routes except static assets and internal Next.js files
    '/(api|trpc)(.*)', // All API and TRPC routes
    '/(?!^/$)', // Excludes the home page
  ],
}
