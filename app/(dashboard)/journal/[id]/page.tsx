import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await prismaConnection.journalEntry.findUnique({
    where: {
      // how to query on a compound index:
      // the underscore replaces the comma in
      // [userId, id]
      // and then provide the value for
      // each of those
      userId_id: {
        userId: user.id,
        id
      }
    }
  })
  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
return (
  <div className="w-full h-full grid grid-cols-3">
    <div className="col-span-2">
      <Editor entry={entry} />
    </div>
    <div>ai stuff</div>
  </div>
)
}

export default EntryPage