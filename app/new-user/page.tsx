import prismaConnection from "@/utils/db";
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser()
  console.log(user)
  const match = await prismaConnection.user.findUnique({
    where: {
      clerkId : user.id as string,
    }
  })
  if (!match) {
    await prismaConnection.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    })
  }
  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>...loading</div>
}

export default NewUser