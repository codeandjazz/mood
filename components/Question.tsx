'use client'

import { useState } from "react"

const Question = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    e.preventDefault()

    // do things here
  }
  return(
    <div>
      <form>
        <input type="text" placeholder="Ask a question" value={value} onChange={onChange}/>
        <button>Ask</button>
      </form>
    </div>
  )
}

export default Question