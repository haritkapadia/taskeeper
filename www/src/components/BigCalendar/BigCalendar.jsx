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
