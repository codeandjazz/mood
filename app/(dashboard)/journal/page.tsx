import EntryCard from "@/components/EntryCard"
import NewEntryCard from "@/components/NewEntryCard"
import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"
import Link from "next/link"

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
  
  await analyze(`Today has been very productive. I applied for two junior dev positions and one dev apprenticeship. My back hurts from sitting in front of my computer for so long.`)
  
  return entries
  
  
}

const JournalPage = async () => {
  const entries = await getEntries()
  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage