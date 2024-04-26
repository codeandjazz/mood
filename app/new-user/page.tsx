import prismaConnection from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/dist/types/server";

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
        clerkId : user.id,
        email: user.email
      }
    })
  }
}

const NewUser = () => {
  return <div>
    hi
  </div>
}

export default NewUser;