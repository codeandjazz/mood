import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async (request, { params }) => {
  const { content } = await request.json()
  const user = await getUserByClerkId()
  const updatedEntry = await prismaConnection.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id, 
        id: params.id
      }
    },
    data: {
      content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  await prismaConnection.analysis.upsert({ // update it if you find it, if you don't find it, then create it
    where: {
      entryId: updatedEntry.id,
    },
    create: { // create it with this
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis // update it with this
  })

  return NextResponse.json({data: updatedEntry})
}