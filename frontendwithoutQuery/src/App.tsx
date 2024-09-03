import { useState } from 'react'

import ContactFrom from './components/ContactForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <ContactFrom />

    </>
  )
}

export default App
