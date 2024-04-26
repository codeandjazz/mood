import { auth } from '@clerk/nextjs/server'
import prismaConnection from './db'

// find a user through the clerkId
export const getUserByClerkId = async ({includes = {}, select = {}}) => {
  const {userId} = await auth()

  const user = await prismaConnection.user.findUniqueOrThrow({
    where: {
      clerkId: userId,

    },
    select,
    includes
  })
  return user
}