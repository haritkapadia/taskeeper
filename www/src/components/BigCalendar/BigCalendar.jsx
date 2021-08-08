/* eslint-disable react/prop-types */
import React from 'react'
import { Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MainCalendar } from './styles.js'

const BigCalendar = ({ localizer, events, onSelectEvent, onSelectSlot }) => (
  <MainCalendar
    localizer={localizer}
    events={events}
    onSelectEvent={onSelectEvent}
    onSelectSlot={onSelectSlot}
    selectable
    defaultView={Views.MONTH}
    scrollToTime={new Date(1970, 1, 1, 6)}
    defaultDate={new Date()}
  />
)

export default BigCalendar
