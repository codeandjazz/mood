import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
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
  return <div className="grid grid-cols-3 gap-4 p-10">
    <NewEntryCard />
    {entries.map(entry => <EntryCard key={entry.id} entry={entry} />)}
  </div>
}

export default JournalPage