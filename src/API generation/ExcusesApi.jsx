import { useEffect, useState } from "react";
import Axios from "axios";


export default function Excuses() {
  const [Excuse, setExcuse] = useState('')

  function handleExcuse(event) {
    Axios.get(`https://excuser-three.vercel.app/v1/excuse/${event.currentTarget.value}/`).then(res => {
    
      for (const obj of res.data) {
        setExcuse(obj.excuse)
      }
    })

  }

  return (
    <>
      <button value='family' onClick={handleExcuse}>Family</button>
      <button value='office' onClick={handleExcuse}>Office</button>
      <button value='children' onClick={handleExcuse}>Children</button>
      <button value='party' onClick={handleExcuse}>Party</button>
      <button value='funny' onClick={handleExcuse}>Funny</button>
      <button value='developers' onClick={handleExcuse}>Developers</button>
      
      
      <h2>
        Your Excuse:<span style={{color:'red'}}>{Excuse}</span>
      </h2>
    </>
  )
}