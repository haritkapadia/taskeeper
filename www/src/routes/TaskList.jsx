import React, { useState, useEffect } from 'react'

const TaskList = () => {
  const [tasks, setTasks] = useState(undefined)
  useEffect(async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, { credentials: 'include' })
    setTasks(await res.json())
  }, [])
  if (tasks) {
    if (tasks.errors) {
      return <>{JSON.stringify(tasks.errors)}</>
    }
    return <>{tasks.map((task) => JSON.stringify(task))}</>
  }
  return <p>Loading...</p>
}

export default TaskList
