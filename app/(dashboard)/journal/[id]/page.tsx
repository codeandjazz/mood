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
        id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  const { mood, subject, summary, negative, color, sentimentScore } = entry?.analysis
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' },
    { name: 'Sentiment Score', value: sentimentScore },
  ]
return (
  <div className="w-full h-full grid grid-cols-3">
    <div className="col-span-2">
      <Editor entry={entry} />
    </div>
    <div className="border-l border-black/10">
      <div className="px-6 py-10" style={{ backgroundColor: color}}>
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