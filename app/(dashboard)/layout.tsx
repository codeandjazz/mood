import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div>Mood</div>
        <ul>
          <li key='/' className="px-2 py-6 text-xl">
            <Link href='/'>Home</Link>
          </li>
          <li key='/journal' className="px-2 py-6 text-xl">
            <Link href='/journal'>Journal</Link>
          </li>
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout