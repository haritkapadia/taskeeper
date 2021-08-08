import React, { useState, useEffect } from 'react'
import enUS from 'date-fns/locale/en-US'
import BigCalendar from '../components/BigCalendar/BigCalendar'
import { dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { apiQuery } from '../util/apiQuery'

const locales = {
  'en-US': enUS
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const tasksToEvents = (tasks) => (
  tasks
    .filter((task) => task.startTime)
    .map(({ name, datetime, startTime, duration }) => ({
      title: name,
      allDay: !datetime,
      start: new Date(startTime),
      end: new Date((new Date(startTime)).getTime() + duration)
    }))
)

const TaskList = () => {
  const [tasks, setTasks] = useState([])

  useEffect(async () => {
    const tasks = await apiQuery('/tasks')
    console.log(tasks)
    setTasks(tasks)
  }, [])

  const onSelectSlot = async ({ start, end, action }) => {
    console.log(start, end, action)
    let newTask
    if (action === 'select') {
      newTask = await apiQuery('/tasks', {
        name: 'A name',
        datetime: true,
        startTime: start,
        duration: end.getTime() - start.getTime()
      })
    } else {
      newTask = await apiQuery('/tasks', {
        name: 'Another name',
        datetime: true,
        startTime: start,
        duration: 0
      })
    }
    if (!newTask.errors) {
      setTasks([...tasks, newTask])
    }
  }

  return (
    <div style = {{ padding: '1%' }}>
      <div style = {{ display: 'flex', flexDirection: 'row' }}>
        <div style = {{ height: '600px', width: '20%', backgroundColor: 'grey' }}>
          Sidebar goes here eventually
        </div>
        <div style = {{ height: '600px', width: '80%' }}>
          <BigCalendar
            localizer={localizer}
            events={tasksToEvents(tasks)}
            onSelectEvent={() => {}}
            onSelectSlot={onSelectSlot}
          />
        </div>
      </div>
    </div>
  )
}

export default TaskList
