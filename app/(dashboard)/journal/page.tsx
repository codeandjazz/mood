import { getUserByClerkId } from "@/utils/auth"
import prismaConnection from "@/utils/db"

const getEntries = async () => {
  const user = await getUserByClerkId
}

const JournalPage = () => {
  return <div>journal</div>
}

export default JournalPage