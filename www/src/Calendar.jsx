/* eslint-disable react/prop-types */
import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const propTypes = {}

class Selectable extends React.Component {
  constructor (...args) {
    super(...args)

    this.state = {
      events: [
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
      ]
    }
  }

  function ({ start, end }) {
    const title = window.prompt('New Event name')
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      })
    }
  }

  render () {
    const { localizer } = this.props
    return (
      <>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={Views.MONTH}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={console.log('d')}
        />
      </>
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable
