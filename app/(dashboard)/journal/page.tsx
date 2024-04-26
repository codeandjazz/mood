import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prismaConnection.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log('entries', entries)
  return <div>journal</div>
}

export default JournalPage