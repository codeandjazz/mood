import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await prismaConnection.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!'
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({data: entry})
  }