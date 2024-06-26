'use client'

import { useState } from "react"

const Question = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    // do things here
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return(
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Ask a question" value={value} onChange={onChange} className="border border-black/20 px-4 py-2 text-lg rounded-lg"/>
        <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg text-lg">Ask</button>
      </form>
    </div>
  )
}

export default Question