/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Popup from '../Popup/Popup'
import EventPopup from '../EventPopup/EventPopup'
import { Views, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MainCalendar } from './styles.js'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

function BigCalendar () {
  // eslint-disable-next-line no-unused-vars
  const [events, updateEvents] = useState([
    {
      title: 'Big Meeting',
      allDay: true,
      start: new Date(2021, 6, 0),
      end: new Date(2021, 6, 0)
    },
    {
      title: 'Vacation',
      start: new Date(2021, 6, 7),
      end: new Date(2021, 6, 10)
    },
    {
      title: 'Conference',
      start: new Date(2021, 6, 20),
      end: new Date(2021, 6, 23)
    }

  ])

  const [startDate, setStart] = useState(null)
  const [endDate, setEnd] = useState(null)
  const [task, setTask] = useState('')
  const [showEventPopup, setEventPopup] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)

  useEffect(() => {
    if (task && startDate && endDate) {
      updateEvents([...events, {
        title: task,
        start: startDate,
        end: endDate
      }])

      console.log(events)
      setStart(null)
      setEnd(null)
      setTask(null)
    }
  })

  // eslint-disable-next-line no-unused-vars
  function handleSelect ({ start, end }) {
    setPopup(true)
    setStart(start)
    setEnd(end)
  }

  const [showPopup, setPopup] = useState(false)

  function togglePopup (tasker) {
    setPopup(!showPopup)
    setTask(tasker)
  }

  function toggleEventPopup (taskEvent) {
    setEventPopup(!showEventPopup)
    setCurrentTask(taskEvent)
    console.log(taskEvent)
  }

  return (
    <>
      {showPopup &&
        <Popup
          toggle = {togglePopup}
        />
      }
      {showEventPopup &&
        <EventPopup
          toggle = {toggleEventPopup}
          task = {currentTask}
        />
      }
      <MainCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => toggleEventPopup(event)}
        // eslint-disable-next-line no-undef
        onSelectSlot={handleSelect}
      />
    </>
  )
}

export default BigCalendar
