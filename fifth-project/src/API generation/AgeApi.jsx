import React, { useEffect } from "react";
import Axios from "axios";


export default function AgeApi() {
  const [name, setName] = React.useState('')
  const [age, setAge] = React.useState(0)

  React.useEffect(() => {
  getAge()
  }, [])
  function getAge() {
    
    Axios.get(`https://api.agify.io/?name=${name}`).then(res => console.log(res.data.age))
  }

  function handleNameValue(event) {
    setName(event.currentTarget.value)


  }
  return (
    <>
      <div>
        <input onChange={handleNameValue} type="text" placeholder="input Name" name="" id="" />
        <p>{age}</p>
        <button onClick={getAge}>Predict age</button>
      </div>
    </>
  )
}