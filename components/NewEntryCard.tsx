'use client' /* turns it into a React components as opposed to a React server component */

const NewEntryCard = () => {
  const handleOnClick = () => {

  }
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
    >
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard