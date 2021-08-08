/* eslint-disable no-unused-vars */
//
import React, { useState } from 'react'
import BigCalendar from './components/BigCalendar/BigCalendar'

const App = () => {
  return (
    <div style = {{ padding: '1%' }}>
      <div style = {{ display: 'flex', flexDirection: 'row' }}>
        <div style = {{ height: '600px', width: '20%', backgroundColor: 'grey' }}>
          Sidebar goes here eventually
        </div>
        <div style = {{ height: '600px', width: '80%' }}>
          <BigCalendar
          />
        </div>
      </div>
    </div>

  )
}

export default App
