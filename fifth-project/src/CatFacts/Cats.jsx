import React from "react";
import Axios from 'axios'

export default function CatFacts() {
  const [catFacts, setCatFacts] = React.useState('')
  React.useEffect(() => {
    handleFacts()
  }, [])
  function handleFacts() {
    Axios.get('https://catfact.ninja/fact').then((res) => {
      setCatFacts(res.data.fact)

    }

    )
  }


  return (
    <>
      <button onClick={handleFacts}>Get Cat Image</button>
      <p>
        {catFacts}
      </p>
    </>
  )
}