import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="invisible h-0 lg:visible lg:absolute lg:w-[200px] lg:top-0 lg:left-0 lg:h-full lg:border-r lg:border-black/10">
        <div>Mood</div>
        <ul>
          <li className="invisible lg:visible lg:px-2 lg:py-6 lg:text-xl">
            <Link href="/">Home</Link>
          </li>
          <li className="invisible lg:visible lg:px-2 lg:py-6 lg:text-xl">
            <Link href="/journal">Journal</Link>
          </li>
        </ul>
      </aside>
      <div className="lg:ml-[200px] h-full">
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