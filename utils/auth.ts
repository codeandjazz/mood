import type { User } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'
import prismaConnection from './db'

// find a user through the clerkId
export const getUserByClerkId = async () => {
  const {userId} = auth()
  const user = await prismaConnection.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
  })
  return user
}