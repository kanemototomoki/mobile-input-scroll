import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="video"></div>
      <input type="text" className="input" name="input"/>
    </div>
  )
}

export default App
