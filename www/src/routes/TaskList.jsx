import React, { useState, useEffect } from 'react'
import enUS from 'date-fns/locale/en-US'
import BigCalendar from '../components/BigCalendar/BigCalendar'
// import NewPopup from '../components/Popup/Popup'
import EventPopup from '../components/EventPopup/EventPopup'
import { dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { apiQuery } from '../util/apiQuery'
import Sidebar from '../components/Sidebar/Sidebar'

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
    .map(({ name, datetime, startTime, duration, ...rest }) => ({
      title: name,
      allDay: !datetime,
      start: new Date(startTime),
      end: new Date((new Date(startTime)).getTime() + duration),
      ...rest
    }))
)

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState(undefined)
  // const [showNewEvent, setShowNewEvent] = useState(false)
  const [showEvent, setShowEvent] = useState(false)

  useEffect(async () => {
    const tasks = await apiQuery('/tasks')
    console.log(tasks)
    setTasks(tasks)
  }, [])

  const closeEventPopup = () => {
    setCurrentTask(undefined)
    setShowEvent(false)
  }

  const onSelectEvent = (event) => {
    setCurrentTask(event)
    setShowEvent(true)
  }

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
        <div style = {{ height: '600px', width: '19%', marginRight: '1%' }}>
          <Sidebar/>
        </div>
        <div style = {{ height: '600px', width: '80%' }}>
          <>
            {showEvent ? <EventPopup task={currentTask} tasks={tasks} toggle={closeEventPopup} /> : undefined}
            <BigCalendar
              localizer={localizer}
              events={tasksToEvents(tasks)}
              onSelectEvent={onSelectEvent}
              onSelectSlot={onSelectSlot}
            />
          </>
        </div>
      </div>
    </div>
  )
}

export default TaskList
