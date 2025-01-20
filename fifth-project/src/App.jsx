import { useState } from 'react'
import './App.css'
import CatFacts from './CatFacts/Cats.jsx'
import AgeApi from './API generation/AgeApi.jsx'
import Excuses from './API generation/ExcusesApi.jsx'
function App() {


  return (
    <>
      {/* <AgeApi />
      <CatFacts /> */}
      <Excuses />
    </>
  )
}

export default App
