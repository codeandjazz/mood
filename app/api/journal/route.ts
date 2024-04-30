import { analyze } from "@/utils/ai"
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

  const analysis = await analyze(entry.content)
  await prismaConnection.analysis.create({
    data: {
      entryId: entry.id,
      ...analysis, // since all of the properties have the same names and the same types in both the zod schema and the prisma schema
    }
  }) 

  revalidatePath('/journal')

  return NextResponse.json({data: entry})
  }