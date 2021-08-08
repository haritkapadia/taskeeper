/* eslint-disable no-unused-vars */
//
import React, { useState } from 'react'
import BigCalendar from '../components/BigCalendar/BigCalendar'
import { dateFnsLocalizer } from 'react-big-calendar'
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

const Home = () => {
  return (
    <div style = {{ padding: '1%' }}>
      <div style = {{ display: 'flex', flexDirection: 'row' }}>
        <div style = {{ height: '600px', width: '20%', backgroundColor: 'grey' }}>
          Sidebar goes here eventually
        </div>
        <div style = {{ height: '600px', width: '80%' }}>
          <BigCalendar
            localizer = {localizer}
          />
        </div>
      </div>
    </div>

  )
}

export default Home
