import styled from 'styled-components'
import { Calendar } from 'react-big-calendar'

export const MainCalendar = styled(Calendar)`
.rbc-toolbar-label {
    font-family: 'Merriweather', serif;
    font-size: 150%;
    margin: 5px;
}

.rbc-btn-group {
    margin: 0px 1vw;
}

.rbc-toolbar button {
    font-family: 'Work Sans', sans-serif;
}

.rbc-header {
    font-family: 'Atkinson Hyperlegible', sans-serif;
    font-weight: normal;
    font-size: 115%;
    padding: 5px;
}

.rbc-time-header-cell {
    min-height: auto;
    font-family: 'Work Sans', sans-serif;
}

.rbc-time-header-cell > .rbc-header {
    font-family: 'Source Sans Pro', sans-serif;
}

.rbc-time-slot {
    font-family: 'Source Sans Pro', sans-serif;
}

.rbc-date-cell {
    padding: 1vh 0.5vw;
    padding-right: 0.7vw;
    font-family: 'Work Sans', sans-serif;
    font-size: 100%;
}

.rbc-event {
    background-color: #33d1d6 !important;
    padding:10px;
    font-family: 'Roboto', sans-serif;
    font-size: 85%;
}
  
.rbc-agenda-empty {
    font-family: 'Source Sans Pro', sans-serif;
    text-align: center;
    padding:10px;
}

th.rbc-header {
    padding: 5px;
}

.rbc-agenda-date-cell {
    font-family: 'Source Sans Pro', sans-serif;
}

.rbc-agenda-time-cell {
    font-family: 'Source Sans Pro', sans-serif;
}

.rbc-agenda-event-cell {
    font-family: 'Source Sans Pro', sans-serif;
}

.rbc-day-bg:hover {
    background-color: #ebebeb;
}

.rbc-off-range-bg:hover {
    background-color: #d2d4d4 !important;
}
`
