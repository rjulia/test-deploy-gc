import React, { useRef, useEffect, useState, useCallback } from "react"
import _ from "lodash"
// markup
const IndexPage = () => {
  const ref = useRef(null)
  const formRef = useRef(null)
  const [data, setData] = useState([])
  const [filter, setFilter] = useState(null)
  

  const getValue = (e) => {
    e.preventDefault()
    const v = parseInt(ref.current.value)
    console.log('heyu', v)
    if(_.isNumber(v)) {
      setFilter(v)
    } else {
      formRef.current.reset()
    }

  }

  const filterData = () => {
    const datafiltered = _.filter(data, item => item.userId === filter)
    console.log('heyu', datafiltered)
  }


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(json => setData(json))
  }, [])

  useEffect(() => {
    filterData()

  }, [filter])




  return (
    <main>
      <form>
        <input type="text" ref={ref}></input>
        <button onClick={(e) =>getValue(e)}>Get Info</button>

      </form>
    {
      data && data.map(item => <div key={item.id}>
        <span style={{marginRight: '20px'}}>USER iD:{item.userId}</span>
        <span>{item.completed ? "complete" : "still working"}</span>
        <p> title: {item.title}</p>
      </div>)
    }
    </main>
  )
}

export default IndexPage
