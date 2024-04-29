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
  const analysisData = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: 'False' },
  ]
return (
  <div className="w-full h-full grid grid-cols-3">
    <div className="col-span-2">
      <Editor entry={entry} />
    </div>
    <div className="border-l border-black/10">
      <div className="bg-blue-300 px-6 py-10">
        <h2 className="text-2xl">Analysis</h2>
      </div>
      <div>
        <ul>
          {analysisData.map((item) => (
            <li
              className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
              key={item.name}
            >
              <span className="text-lg font-semibold">{item.name}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)
}

export default EntryPage