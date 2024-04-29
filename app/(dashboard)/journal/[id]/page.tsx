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
}

const EntryPage = ({params}) => {
return <div>
  <Editor />
</div>
}

export default EntryPage